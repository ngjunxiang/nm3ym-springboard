import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Message, MessageService } from 'primeng/components/common/api';

import { ROUTES } from './cm.sidebar-items';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { CMService } from '../../../core/services/cm.service';

@Component({
    selector: 'app-cm',
    templateUrl: './cm.component.html',
    styleUrls: ['./cm.component.scss']
})

export class CMComponent implements OnInit {

    // Theme
    color = 'defaultdark';
    showSettings = false;
    showMinisidebar = false;
    showDarktheme = false;


    // UI Control
    sidebarRoutes = ROUTES;
    reg51Notification: Message[] = [];

    // Name & Email
    name: string;
    email: string;
    notifications: any;

    public config: PerfectScrollbarConfigInterface = {};

    constructor(
        private authService: AuthenticationService,
        private cmService: CMService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        if (this.router.url === '/') {
            this.router.navigate(['/dashboard']);
        }

        this.route.queryParams.subscribe(params => {
            if (params['err'] === 'auth001') {
                this.messageService.add({ 
                    key: 'msgs', severity: 'warn', summary: 'Access Denied', detail: 'You do not have permission to access that page. Please contact the admin.'
                });
            }
        });

        this.retrieveUserDetails();
        this.retrieveReg51Notification();
        this.retrieveNotifications();
    }

    async retrieveUserDetails() {
        await this.authService.retrieveUserDetails().then(res => {
            if (res.error) {
                this.messageService.add({ 
                    key: 'msgs', severity: 'error', summary: 'Server Error', detail: 'Please contact the admin.'
                });
            }

            if (res.name && res.email) {
                this.name = res.name;
                this.email = res.email;
                this.authService.userDetails = {
                    'name': this.name,
                    'email': this.email
                };
            }
        }, error => {
            this.messageService.add({ 
                key: 'msgs', severity: 'error', summary: 'Server Error', detail: error
            });
        })
    }

    retrieveReg51Notification() {
        this.cmService.retrieveReg51Notification().subscribe(res => {
            if (res.results.toShow) {
                this.reg51Notification.push({
                    key: 'msgs', severity: 'warn',
                    summary: 'Update Reg51 References',
                    detail: 'Reg51 has been updated on <b>' + res.results.lastUpdatedDate
                        + '</b>. Please update all Reg51 references in FAQ.'
                });
            }
        });
    }

    retrieveNotifications() {
        this.cmService.retrieveNotifications().subscribe(res => {
            if (res.error) {
                this.messageService.add({ 
                    key: 'msgs', severity: 'error', summary: 'Server Error', detail: 'Notifications cannot be retrieved. Please contact the admin.'
                });
                return;
            }
            if (res.results) {
                this.notifications = {};
                let newNotifications = [];
                let allNotifications = [];

                res.results.notifications.forEach(notification => {
                    let notif;

                    // if (notification.type.changed === '1') {
                    //     notif = notification.name + ': <br> \n <strong><font color="black">' + notification.type.documentName + '</font></strong> has been <strong><font color="black">edited</font></strong>.';
                    // }

                    // if (notification.type.changed === '2') {
                    //     notif = notification.name + ': <br> \n <strong><font color="black">' + notification.type.documentName + '</font></strong> has been <strong><font color="black">added</font></strong>.';
                    // }

                    // if (notification.type.changed === '3') {
                    //     notif = notification.name + ': <br> \n <strong><font color="black">' + notification.type.documentName + '</font></strong> has been <strong><font color="black">deleted</font></strong>.';
                    // }

                    if (notification.question) {
                        notif = 'New FAQ has been posted <br>' + '<strong><font color="black">' + notification.question + '</font></strong>';
                    }

                    if (!notification.checked) {
                        newNotifications.push(notif);
                    }

                    allNotifications.push(notif);
                });

                this.notifications['newNotifications'] = newNotifications;
                this.notifications['allNotifications'] = allNotifications;
            }
        }, error => {
            this.messageService.add({ 
                key: 'msgs', severity: 'error', summary: 'Server Error', detail: error
            });
        });
    }

    updateNotifications(event) {
        this.cmService.updateNotifications().subscribe(res => {
            if (res.error) {
                this.messageService.add({ 
                    key: 'msgs', severity: 'error', summary: 'Server Error', detail: 'Notifications cannot be retrieved. Please contact the admin.'
                });
            }
        }, error => {
            this.messageService.add({ 
                key: 'msgs', severity: 'error', summary: 'Server Error', detail: error
            });
        });
    }
}