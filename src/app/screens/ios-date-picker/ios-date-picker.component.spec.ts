import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IosDatePickerComponent } from './ios-date-picker.component';

describe('IosDatePickerComponent', () => {
  let component: IosDatePickerComponent;
  let fixture: ComponentFixture<IosDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ IosDatePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IosDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
