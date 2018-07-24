import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError, Observable, observable, of } from '../../../../node_modules/rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

interface User {
    username: string;
    email: string;
    userType: string;
    password: string;
}

interface Data {
    users: User[];
}

interface Response {
    results: string;
    error: string;
}

@Injectable({
    providedIn: 'root'
})

export class UserMgmtService {

    private retrieveUsersURL = 'http://localhost:8000/app/retrieve-users';
    private CUDUsersURL = 'http://localhost:8000/app/manage-users';

    usernames = [];
    emails = [];
    
    constructor(
        private authService: AuthenticationService,
        private http: HttpClient
    ) { }

    createUser(newUsername, newEmail, newUserType, newPassword) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        const userData = { 
            'newUsername': newUsername,
            'newEmail': newEmail,
            'newUserType': newUserType,
            'newPassword': newPassword
        };

        const postData = Object.assign(this.authService.authItems, userData);

        return this.http.post<Response>(this.CUDUsersURL, postData, httpOptions)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    updateUser(updateUsername, updatePassword) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        const userData = { 
            'updateUsername': updateUsername,
            'updatePassword': updatePassword
        };

        const postData = Object.assign(this.authService.authItems, userData);

        return this.http.put<Response>(this.CUDUsersURL, postData, httpOptions)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    retrieveUsersList() {
        let users = [];
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        const postData = this.authService.authItems;

        return this.http.post<Data>(this.retrieveUsersURL, postData, httpOptions)
            .pipe(
                map(data => users = data.users),
                retry(3),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };
}
