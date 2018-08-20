import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Message } from 'primeng/components/common/api';

import { OnboardService } from '../../../../core/services/onboard.service';

@Component({
    selector: 'rm-dashboard',
    templateUrl: './rm-dashboard.component.html',
    styleUrls: ['./rm-dashboard.component.scss']
})

export class RMDashboardComponent implements OnInit {

    // UI Control
    loading = false;
    msgs: Message[] = [];

    // UI Components
    obProcesses: any;

    constructor(
        private confirmationService: ConfirmationService,
        private onboardService: OnboardService,
        private router: Router
    ) { }

    ngOnInit() {
        this.retrieveAllOnboardProcesses();
    }

    toggleUrgent(index: number) {
        this.obProcesses[index].urgent = !this.obProcesses[index].urgent
        // invoke service
    }

    retrieveAllOnboardProcesses() {
        this.loading = true;
        this.obProcesses = [];
        this.onboardService.retrieveAllOnboardProcesses().subscribe(res => {
            if (res.error) {
                this.msgs.push({
                    severity: 'error', summary: 'Error', detail: res.error
                });
                return;
            }
            
            if (res.obLists) {
                res.obLists.forEach(obList => {
                    let requiredFields = [];
                    let type = obList.name;
                    let obID = obList.obID;
                    let conditions = [];
                    let progress = obList.progress;
                    let urgent = obList.urgent;
                    Object.keys(obList.requiredFields).forEach(key => {
                        let fieldName;
                        for (fieldName in obList.requiredFields[key]);
                        requiredFields.push({
                            'fieldName': fieldName,
                            'fieldValue': obList.requiredFields[key][fieldName]
                        });
                    });

                    obList.conditions.forEach(condition => {
                        conditions.push({
                            'conditionName': condition.conditionName,
                            'conditionValue': condition.conditionOption
                        });
                    });

                    this.obProcesses.push({
                        'obID': obID,
                        'type': type,
                        'requiredFields': requiredFields,
                        'conditions': conditions,
                        'progress': progress,
                        'urgent': urgent
                    });
                });
            }
            this.loading = false;
        });
    }

    editOnboardProcess(index: number) {
        let selectedOnboardID = this.obProcesses[index].obID;
        this.router.navigate(['/rm/onboard/edit', selectedOnboardID], {
            queryParams: {
                name: this.obProcesses[index].type
            }
        });
    }

    deleteOnboardProcess(index: number) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this onboard process?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                let selectedOnboardID = this.obProcesses[index].obID;
                this.onboardService.deleteOnboardProcess(selectedOnboardID).subscribe(res => {
                    if (res.error) {
                        this.msgs.push({
                            severity: 'error', summary: 'Error', detail: res.error
                        });
                        return;
                    }

                    if (res.results) {
                        this.retrieveAllOnboardProcesses();
                        this.msgs.push({
                            severity: 'success', summary: 'Success', detail: 'Onboard process deleted'
                        });
                    }
                }, error => {
                    this.msgs.push({
                        severity: 'error', summary: 'Error', detail: error
                    });
                });
            },
            reject: () => {
                return;
            }
        });
    }
}
