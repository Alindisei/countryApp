import { Component, OnInit, } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Router, RouterModule } from '@angular/router';
import CountryTableComponent from '../../components/country-table/country-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import InfoCountryPageComponent from '../infoCountry-page/infoCountry-page.component';


@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  standalone: true,
  imports:[CommonModule, CountryTableComponent, RouterModule,
     FormsModule, InfoCountryPageComponent],
  styleUrls: ['./by-country-page.component.css'
  ]
})

export default class ByCountryPageComponent implements OnInit {
  
  public countries:    Country[] = [];
  public initialValue: string = '';

  constructor(
    private countriesService: CountriesService, 
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.getCountry(this.initialValue);
  }

  getCountry(country: string): void {
    this.countriesService.searchCountry(country)
      .subscribe(countries => {
        this.countries = countries;
      });
  }

  onSearchInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const country = inputElement.value.trim();
    this.getCountry(country);
  }


  navigateToCountry(country: Country): void {
    this.router.navigate(['/info', country.cca3]);
  }
  
}

