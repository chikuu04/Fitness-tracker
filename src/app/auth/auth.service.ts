import { Subject } from 'rxjs/Subject';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router: Router, private afAuth: AngularFireAuth, private snackbar: MatSnackBar) { }

    // tslint:disable-next-line: typedef
    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            this.authSuccessfully();
        })
        .catch(error => {
            this.snackbar.open(error.message, null, {
                duration: 3000
            });
        });
    }

    // tslint:disable-next-line: typedef
    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            this.authSuccessfully();
        })
        .catch(error => {
            this.snackbar.open(error.message, null, {
                duration: 3000
            });
        });
    }

    // tslint:disable-next-line: typedef
    logout() {
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
    }

    // tslint:disable-next-line: typedef
    isAuth() {
        return this.isAuthenticated;
    }

    // tslint:disable-next-line: typedef
    private authSuccessfully() {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }

}
