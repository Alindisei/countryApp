import { Component, OnInit, } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { CommonModule } from '@angular/common';
import { FormsModule, } from '@angular/forms';
import CountryTableComponent from "../../components/country-table/country-table.component";
import { Router } from '@angular/router';


@Component({
    selector: 'app-by-capital-page',
    templateUrl: './by-capital-page.component.html',
    standalone: true,
    styleUrls: ['./by-capital-page.component.css'],
    imports: [CommonModule, FormsModule, CountryTableComponent]
})

  export default class ByCapitalPageComponent implements OnInit {
    public countries: Country[] = [];
    public initialValue = '';
  
    constructor( 
      private countriesService: CountriesService,
      private router: Router 
    ) {}
  
    ngOnInit(): void {
      this.getCountriesByCapital(this.initialValue);
    }
  
    getCountriesByCapital(capital: string): void {
      this.countriesService.searchCapital(capital)
        .subscribe(countries => {
          this.countries = countries;
        });
    }
  
    onSearchInput(event: Event): void {
      const inputElement = event.target as HTMLInputElement;
      const capital = inputElement.value.trim();
      this.getCountriesByCapital(capital);
    }
    

    navigateToCountry(country: Country): void {
      this.router.navigate(['/info', country.cca3]);
    }

  
}
