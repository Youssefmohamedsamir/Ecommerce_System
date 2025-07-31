import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryesComponent } from './categoryes.component';

describe('CategoryesComponent', () => {
  let component: CategoryesComponent;
  let fixture: ComponentFixture<CategoryesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
