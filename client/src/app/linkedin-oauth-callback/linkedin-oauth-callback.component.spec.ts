import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedinOauthCallbackComponent } from './linkedin-oauth-callback.component';

describe('LinkedinOauthCallbackComponent', () => {
  let component: LinkedinOauthCallbackComponent;
  let fixture: ComponentFixture<LinkedinOauthCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkedinOauthCallbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedinOauthCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
