import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from "@angular/material/input";
import { CountryCode, CountryCodes } from "./constant";
import { MatListModule } from "@angular/material/list";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'fuzzy-search-wt',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatListModule,
    FormsModule
  ],
  templateUrl: './fuzzy-search.component.html',
  styleUrls: ['./fuzzy-search.component.scss']
})
export class FuzzySearchComponent implements OnInit {
  countryCodes: Array<CountryCode> = CountryCodes;
  searchText = '';
  result: CountryCode[] = this.countryCodes;

  constructor() { }

  ngOnInit(): void {
  }

  /*searcher = new FuzzySearch(this.countryCodes, ["name", "dial_code", "code"], {});

  onSearchText() {
    this.result = this.searcher.search(this.searchText);
  }*/

}
