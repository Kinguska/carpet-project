import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoveComponent } from './add-remove.component';

describe('AddRemoveComponent', () => {
  let component: AddRemoveComponent;
  let fixture: ComponentFixture<AddRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRemoveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
