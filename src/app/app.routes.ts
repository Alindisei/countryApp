
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path:'home',
    title: 'Home',
    loadComponent: () => import('./shared/pages/navegation/navegation.component'),
    children: [
        {
          path:'region',
          title: 'Region',
          loadComponent: () => import('./countries/pages/by-region-page/by-region-page.component'),
        },
        {
          path:'country',
          title: 'Country',
          loadComponent: () => import('./countries/pages/by-country-page/by-country-page.component'),
      },
      {
          path:'capital',
          title: 'Capital',
          loadComponent: () => import('./countries/pages/by-capital-page/by-capital-page.component'),
      },
      {
        path:'info',
        title: 'Info Country',
        loadComponent: () => import('./countries/pages/infoCountry-page/infoCountry-page.component')
      },
      {
        path:'maps',
        title: 'Maps',
        loadComponent: () => import('./countries/pages/map-page/map-page.component')
      },
      {
        path:'language',
        title: 'Languages',
        loadComponent: () => import('./countries/pages/language-page/language-page.component')
      },
      {
        path:'info/:id',
        title: 'Info Country',
        loadComponent: () => import('./countries/pages/infoCountry-page/infoCountry-page.component')
      },

    ]

  }, 
  
  {
    path: '',
    redirectTo: '/home',
    pathMatch:'full'
  },

];


@NgModule({

  imports: [
    RouterModule.forRoot(routes),
  ],

  exports: [
    RouterModule,
  ]

})

export class AppRoutingModule { }
