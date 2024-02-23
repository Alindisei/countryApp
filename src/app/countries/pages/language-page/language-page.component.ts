import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { MatCommonModule } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import CountryTableComponent from '../../components/country-table/country-table.component';


@Component({
  selector: 'app-map-page',
  templateUrl: './language-page.component.html',
  imports: [ CommonModule, MatCommonModule,MatTableModule, CountryTableComponent],
  standalone: true,
  styleUrls: ['./language-page.component.css']
})
export default class LanguagePageComponent  implements OnInit {
  
public countries: Country[] = [];
public  languages: string[] = [];

constructor ( private countriesService:CountriesService ){}

ngOnInit(): void {
  this.getAvailableLanguages();
}



private getAvailableLanguages(): void {
  this.countriesService.searchLanguage('spa')
    .subscribe( countries => {
    const uniqueLanguages: Set<string> = new Set();
    countries.forEach(country => {
      if (country.languages) {
        Object.values(country.languages).forEach(lang => {
          if (lang) uniqueLanguages.add(lang);
        });
      }
    });
    this.languages = Array.from(uniqueLanguages);
  });
}

searchCountriesByLanguage(language: string): void {
  this.countriesService.searchLanguage(language).subscribe(countries => {
    this.countries = countries;
  });
}



}
