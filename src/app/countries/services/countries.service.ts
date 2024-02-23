import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country, Languages } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache.store.interface';
import { Region } from '../interfaces/region.type';


@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  public cacheStore: CacheStore = {
    byCapital:   { term:   '', countries: [] },
    byCountries: { term:   '', countries: [] },
    byRegion:    { region: '', countries: [] },
    byLanguage:  { language: '', countries: [] },
  }


  constructor( private http: HttpClient ) {
    this.loadFromLocalStorage();
   }

  private saveToLocalStorage () {
    localStorage.setItem( 'cacheStore', JSON.stringify( this.cacheStore ));

  }

  //para verificar si esta en cacheStore
  private loadFromLocalStorage() {
    if ( !localStorage.getItem('cacheStore') ) return;

    this.cacheStore = JSON.parse( localStorage.getItem( 'cacheStore')! );
  }


  private getCountriesRequest( url: string ): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError( () => of([]) ),
          //delay( 2000),
      );

  }


  /*
    metodo de busqueda. entre () va el code, ya que estamos esperando un code.
    luego se especifica una ruta. en el observable me devolvera un pais o un null.
    la funcion del map es transformar la informacion (exp:si countries es mayor que 0,
    regresare el country en la posicion 1, caso no devolvere null.
  */
  searchCountryByAlphaCode (code: string): Observable<Country | null> {

    const url = `${ this.apiUrl }/alpha/${ code }`;

    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ?countries [0]: null),
        catchError( () => of (null) )
      );

  }

  /*
    term, significa termino de busqueda (basicamente es lo que busca el usuario, en el input.)
    explicacion del metodo abajo:
    yo voy a retornar un observable. la sintaxis a partir de alli es la configuracion de la solicitud.
    ojo: aqui no se hace la solicitud, solo se configura.
    para solicitar habria que poner el .suscribe
  */
  searchCapital( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/capital/${ term }`;
    return this.getCountriesRequest( url )
      .pipe(
        tap( countries => this.cacheStore.byCapital = { term, countries }),
        tap( () => this.saveToLocalStorage() )
      );

  }

  searchCountry( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${ term }`;
    return this.getCountriesRequest( url )
      .pipe(
        tap( countries => this.cacheStore.byCountries = { term, countries }),
        tap( () => this.saveToLocalStorage() )
      );


  }

  searchRegion( region: Region ): Observable<Country[]> {
    const url = `${ this.apiUrl }/region/${ region }`;
    return this.getCountriesRequest( url )
      .pipe(
        tap( countries => this.cacheStore.byRegion = { region, countries }),
        tap( () => this.saveToLocalStorage() )
      );

  }

  searchLanguage( language: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/lang/${language}`;
    return this.getCountriesRequest( url )
      .pipe(
        tap( countries => this.cacheStore.byLanguage = { language, countries }),
        tap( () => this.saveToLocalStorage() )
      );

  }
  


}
