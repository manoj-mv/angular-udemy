import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeStartMsgComponent } from './recipe-start-msg.component';

describe('RecipeStartMsgComponent', () => {
  let component: RecipeStartMsgComponent;
  let fixture: ComponentFixture<RecipeStartMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeStartMsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeStartMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
