import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RollDate } from "./ios-picker";

@Component({
  selector: 'ios-date-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ios-date-picker.component.html',
  styleUrls: ['./ios-date-picker.component.scss']
})
export class IosDatePickerComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    new RollDate({
      el: '#date-group1-1',
      format: 'DD/MM',
      beginYear: 1990,
      endYear: 2050,
      trigger: 'tap',
      cfg: {
        language: 'vi',
      }
    });
  }
}
