import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {


  @Output() closeSideNav = new EventEmitter<void>();

  isAuth = false;
  authSubscription: Subscription;
  authStatus: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

    // tslint:disable-next-line: typedef
    onClose() {
      this.closeSideNav.emit();
    }

    // tslint:disable-next-line: typedef
    onLogout(){
      this.onClose();
      this.authService.logout();
    }

    // tslint:disable-next-line: typedef
    ngOnDestroy(){
      this.authSubscription.unsubscribe();
    }


}
