import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpetviewerComponent } from './carpetviewer.component';

describe('CarpetviewerComponent', () => {
  let component: CarpetviewerComponent;
  let fixture: ComponentFixture<CarpetviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarpetviewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarpetviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
