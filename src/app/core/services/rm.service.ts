import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { environment } from '../../../environments/environment';

interface Response {
    results: any;
    error: string;
}

interface Checklist {
    clID: string;
    name: string;
    requiredFields: string[];
    conditions: any;
    complianceDocuments: any;
    legalDocuments: any;
    error: string;
}

interface ChecklistNames {
    clNames: ChecklistName[];
    error: string;
}

interface ChecklistName {
    name: string;
    clID: string;
    updatedBy: string;
    version: string;
    dateCreated: Date;
}

interface AllOBResponse {
    error: string;
    obLists: ObList[];
}

interface ObList {
    name: string;
    obID: string;
    clID: string;
    version: string;
    progress: number;
    requiredFields: any[];
    conditions: any[];
    dateCreated: Date;
    urgent: boolean;
    complianceDocuments: any;
    legalDocuments: any;
    error: string;
}

@Injectable({
    providedIn: 'root'
})

export class RMService {
    // Dashboard Endpoint
    private retrieveDashboardStatsURL = environment.host + '/app/rm/retrieve-dashboard';

    // Checklist Endpoints
    private retrieveChecklistNamesURL = environment.host + '/app/rm/retrieve-checklistNames';
    private retrieveChecklistURL = environment.host + '/app/rm/retrieve-checklist';

    // Notifications Endpoints
    private retrieveNotificationsURL = environment.host + '/app/rm/retrieve-all-notifications';
    private updateNotificationsURL = environment.host + '/app/rm/update-notifications';

    // Onboard Endpoints
    private createOnboardProcessURL = environment.host + '/app/rm/create-onboard';
    private retrieveAllOnboardProcessesURL = environment.host + '/app/rm/retrieve-all-onboard';
    private retrieveOnboardProcessDetailsURL = environment.host + '/app/rm/retrieve-selected-onboard';
    private deleteUpdateOnboardProcessURL = environment.host + '/app/rm/manage-onboard';
    private retrieveAllRMNamesURL = environment.host + '/app/rm/retrieve-rm-names';

    constructor(
        private authService: AuthenticationService,
        private http: HttpClient
    ) { }

    retrieveDashboardStats() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        const postData = this.authService.authItems;

        return this.http.post<Response>(this.retrieveDashboardStatsURL, postData, httpOptions)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    retrieveNotifications() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        const postData = this.authService.authItems;

        return this.http.post<Response>(this.retrieveNotificationsURL, postData, httpOptions)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    retrieveRMChecklistNames() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        const postData = this.authService.authItems;

        return this.http.post<ChecklistNames>(this.retrieveChecklistNamesURL, postData, httpOptions)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    retrieveRMChecklistDetails(checklistId) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        const checklistIdData = {
            'clID': checklistId
        };

        const postData = Object.assign(this.authService.authItems, checklistIdData);

        return this.http.post<Checklist>(this.retrieveChecklistURL, postData, httpOptions)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    retrieveAllOnboardProcesses() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        const postData = this.authService.authItems;

        return this.http.post<AllOBResponse>(this.retrieveAllOnboardProcessesURL, postData, httpOptions)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    retrieveAllRMNames() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        const postData = this.authService.authItems;

        return this.http.post<Response>(this.retrieveAllRMNamesURL, postData, httpOptions)
            .pipe(
                retry(3),
            );
    }

    retrieveOnboardProcessDetails(obID) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        const obIDData = {
            'obID': obID
        };

        const postData = Object.assign(this.authService.authItems, obIDData);

        return this.http.post<ObList>(this.retrieveOnboardProcessDetailsURL, postData, httpOptions)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    createOnboardProcess(onboardProcessData) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        const onboardData = {
            'checklist': JSON.stringify(onboardProcessData)
        };

        const postData = Object.assign(this.authService.authItems, onboardData);

        return this.http.post<Response>(this.createOnboardProcessURL, postData, httpOptions)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    updateNotifications() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        const postData = this.authService.authItems;

        return this.http.post<Response>(this.updateNotificationsURL, postData, httpOptions)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    updateOnboardProcess(onboardProcessData) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        const onboardData = {
            'obID': onboardProcessData.obID,
            'checklist': JSON.stringify(onboardProcessData)
        };

        const postData = Object.assign(this.authService.authItems, onboardData);

        return this.http.post<Response>(this.deleteUpdateOnboardProcessURL, postData, httpOptions)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    deleteOnboardProcess(obID) {
        const obIDData = {
            'obID': obID
        };

        const postData = Object.assign(this.authService.authItems, obIDData);

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: postData
        };

        return this.http.delete<Response>(this.deleteUpdateOnboardProcessURL, httpOptions)
            .pipe(
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