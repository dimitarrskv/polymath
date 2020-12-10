import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramOauthCallbackComponent } from './instagram-oauth-callback.component';

describe('InstagramOauthCallbackComponent', () => {
  let component: InstagramOauthCallbackComponent;
  let fixture: ComponentFixture<InstagramOauthCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstagramOauthCallbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstagramOauthCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
