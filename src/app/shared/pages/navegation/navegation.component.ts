import { Component, ViewChild, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navegation',
  templateUrl: './navegation.component.html',
  standalone: true,
  imports: [  
    CommonModule, RouterModule, MatToolbarModule, MatSidenavModule,
    MatIconModule, MatListModule, MatIconModule, 
   
],
  styleUrls: ['./navegation.component.css']
})


export default class NavegationComponent {

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor() { }

  toggleSideNav() {
    this.sidenav.toggle();
  }
}
