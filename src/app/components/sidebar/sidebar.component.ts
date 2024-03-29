import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule
  ],
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  alo() {
    console.log('alo');
  }

  onAuxClick() {
    console.log('aux');
  }

  onContextMenuClick(e: MouseEvent) {
    e.preventDefault();
    console.log(e)
  }
}
