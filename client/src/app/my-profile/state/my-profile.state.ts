import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Profile } from '../models/profile.model';
import { MyProfileService } from '../services/my-profile.service';

export class GetMyProfile {
  static readonly type = '[My Profile] Get My Profile';
  constructor() {}
}

interface MyProfileStateModel {
  profile: Profile;
}

@State<MyProfileStateModel>({
  name: 'myProfile',
  defaults: {
    profile: undefined
  }
})
@Injectable()
export class MyProfileState {

  @Selector()
  static profile(state: MyProfileStateModel): Profile {
    return state.profile;
  }

//   @Selector()
//   static profilePhoto(state: MyProfileStateModel): TODO {
//     return state.TODO;
//   }

  constructor(private myProfileService: MyProfileService) {

  }

  @Action(GetMyProfile)
  async getMyProfile(ctx: StateContext<MyProfileStateModel>) {

    let profile: Profile;
    try {
      profile = await this.myProfileService.profile.toPromise();
      ctx.patchState({
        profile
      });
    } catch (error) {
      alert('Error getting your profile')
    }

  }

//   @Action(DeleteTodo)
//   deleteTodo(ctx: StateContext<TodoStateModel>, action: DeleteTodo) {
//     const { todos } = ctx.getState();
//     ctx.patchState({
//       todos: todos.filter(todo => todo !== action.payload)
//     });
//   }

//   @Action(ToggleTodo)
//   toggleTodo(ctx: StateContext<TodoStateModel>, action: ToggleTodo) {
//     const todo = action.payload;
//     todo.done = !todo.done;
//     ctx.patchState({
//       todos: [...ctx.getState().todos]
//     })
//   }

//   @Action(ToggleAllTodos)
//   toggleAllTodos(ctx: StateContext<TodoStateModel>, action: ToggleTodo) {
//     const { todos } = ctx.getState();
//     const allDone = todos.every(todo => todo.done);
//     todos.forEach(todo => todo.done = !allDone);
//     ctx.patchState({
//       todos: [...todos]
//     })
//   }
}