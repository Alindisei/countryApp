import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { RouterModule,  } from '@angular/router';
import { CommonModule } from '@angular/common';
import InfoCountryPageComponent from '../../pages/infoCountry-page/infoCountry-page.component';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  standalone: true,
  imports:[RouterModule, CommonModule, InfoCountryPageComponent, ],
  styles: [
    `img {
      width: 25px;
    }`

  ]
})

export default  class CountryTableComponent {

  @Input()
  public countries: Country[] =  [];
  @Output() 
  public countryClicked: EventEmitter<Country> = new EventEmitter<Country>();

  // Method to handle country click
  onCountryClick(country: Country): void {
    this.countryClicked.emit(country);
  }

  
}
