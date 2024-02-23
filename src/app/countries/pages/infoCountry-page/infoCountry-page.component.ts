import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country, Currency, Languages } from '../../interfaces/country.interface';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-info-country-page',
  templateUrl: './infoCountry-page.component.html',
  standalone: true,
  imports: [ CommonModule,],
  styles: [ 
  ]
})
export default class InfoCountryPageComponent  implements OnInit {

  public country?: Country;

  //obtener el url y navegar al link
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService,
  ) {}


  ngOnInit(): void {

    /* lo que hace el switchMap es estar inscrito a este observable(lo que sigue despues de la flecha)
    luego al subscribirse me devolvera un country*/
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode( id )),
    )
    .subscribe ( country => {
     if ( !country ) return this.router.navigateByUrl('');
    return this.country = country;
    });


  }

  }

 