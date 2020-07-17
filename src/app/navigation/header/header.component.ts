import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle =  new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;
  authStatus: boolean;
  constructor(private authService: AuthService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  // tslint:disable-next-line: typedef
  onToggleSidenav(){
    this.sidenavToggle.emit();
  }

  // tslint:disable-next-line: typedef
  onLogout(){
      this.authService.logout();
  }

  // tslint:disable-next-line: typedef
  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

  

}
