import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostponedComponent } from './postponed.component';

describe('PostponedComponent', () => {
  let component: PostponedComponent;
  let fixture: ComponentFixture<PostponedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostponedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostponedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
