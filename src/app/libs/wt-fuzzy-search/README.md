# Fuzzy search (with types)
    Base on fuzzy search.
[Home Page](https://github.com/wouter2203/fuzzy-search)
## Installation

> Using npm

`npm install wt-fuzzy-search --save`

## Quick start guide
### Demo in angular:

```typescript
    import { FuzzySearch } from 'wt-fuzzy-search';
    
    interface CountryCode {
        name: string;
        dial_code: string;
        code: string;
    };
    @Component({
        selector: "demo-fuzzy-search",
        template: `
            <mat-form-field appearance="fill">
              <mat-label>Search</mat-label>
              <input
                type="email"
                matInput
                autocomplete="off"
                [(ngModel)]="searchText"
                (input)="onSearchText()"
              >
            </mat-form-field>
            <a>
              <mat-nav-list class="country-list">
                <a mat-list-item *ngFor="let code of result">
                  <span mat-line>{{ code.name }}</span>
                  <span mat-line>{{ code.dial_code }}</span>
                </a>
              </mat-nav-list>
            </a>
        `,
        styleUrls: [],
        standalone: true,
        imports: [
            CommonModule,
            MatInputModule,
            MatListModule,
            FormsModule
        ],
    })
    export class Demo {
        countryCodes: Array<CountryCode> = CountryCodes;
        searchText = '';
        result: CountryCode[] = this.countryCodes;
    
        searcher = new FuzzySearch(this.countryCodes, ["name", "dial_code", "code"], { caseSensitive: false });
    
        onSearchText() {
            this.result = this.searcher.search(this.searchText);
        }
    
    }
```

## Documentation
```javascript
const searcher = new FuzzySearch([list], [keys], options);
const result = searcher.search(`<searchText>`);
```

**[list]** *(type: `Array`)*

Array of objects containing the search list.

---

**[keys]** *(type: `Array`, default: `[]`)*

List of properties that will be searched. This also supports nested properties.

---

**[options]** *(type: `Object`)*

Object with options that will configure the search.
```typescript
interface SearchOptions {
  caseSensitive?: boolean; // default = false
  sort?: boolean;          // default = false
}
```
- caseSensitive: Indicates whether comparisons should be case-sensitive.
- sort:
  + When `true` it will sort the results by best match (when searching for `abc` in the search set `['a__b__c', 'abc']` it would return `abc` as the first result).
  + When `false` it will return the results in the original order.
---

**\<searchText\>** *(type: `String`, default: `''`)*

