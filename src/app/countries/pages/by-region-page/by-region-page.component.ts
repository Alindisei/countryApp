import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';
import { FormsModule } from '@angular/forms';
import CountryTableComponent from '../../components/country-table/country-table.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  imports: [FormsModule, CountryTableComponent, CommonModule],
  standalone: true,
  styleUrls: ['./by-region-page.component.css']
})
export default class ByRegionPageComponent implements OnInit {

  public countries:       Country[] = [];
  public regions:         Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  public initialValue:    string = '';

  constructor( private countriesService: CountriesService ) {}


  ngOnInit(): void {
     this.countries = this.countriesService.cacheStore.byRegion.countries;
     this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion( region: Region ): void {
    this.selectedRegion = region;
    this.countriesService.searchRegion( region )
      .subscribe( countries => {
        this.countries = countries;

    });


  }

}
