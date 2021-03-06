import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/api';

import { CMService } from '../../../../core/services/cm.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'cm-faq-create',
    templateUrl: './cm-faq-create.component.html',
    styleUrls: ['./cm-faq-create.component.css']
})

export class CMFaqCreateComponent implements OnInit {

    // UI Control
    loading = false;

    //UI Controls for PDF Reference
    pdfPages: any[] = [];
    includePDF: boolean;
    selectedPages: any[];

    // UI Components
    faqForm: FormGroup;

    constructor(
        private cmService: CMService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.loading = true;
        this.selectedPages = [];

        this.faqForm = this.fb.group({
            question: new FormControl('', Validators.required),
            answer: new FormControl('', Validators.required)
        });

        this.retrievePDFLength();

        this.loading = false;
    }

    retrievePDFLength() {
        this.cmService.retrievePdfLength().subscribe(res => {
            if (res.error) {
                this.messageService.add({
                    key: 'msgs', severity: 'error', summary: 'Error', detail: res.error
                });
                return;
            }

            if (res.results) {
                let numPages = res.results.pageCount;
                for(let i = 1; i <= numPages; i++){
                    this.pdfPages.push({
                        label: "" + i,
                        value: i
                    });
                }
            }

        }, error => {
            this.messageService.add({
                key: 'msgs', severity: 'error', summary: 'Error', detail: error
            });
        });
    }

    postFAQ() {
        this.faqForm.get('question').markAsDirty();
        this.faqForm.get('answer').markAsDirty();

        if (this.faqForm.get('question').invalid || this.faqForm.get('answer').invalid) {
            this.messageService.add({
                key: 'msgs', severity: 'error', summary: 'Error', detail: 'Please fill in all fields'
            });
            return;
        }

        let answer = this.faqForm.get("question").value;
        let question = this.faqForm.get("answer").value;
        if (answer !== '' && question !== '') {
            this.loading = true;
            this.cmService.createFAQ(answer, question, this.selectedPages).subscribe(res => {
                if (res.error) {
                    this.messageService.add({
                        key: 'msgs', severity: 'error', summary: 'Error', detail: res.error
                    });
                    this.loading = false;
                    return;
                }

                if (res.results) {
                    this.messageService.add({
                        key: 'msgs', severity: 'success', summary: 'Success', detail: 'FAQ has been created. You will be redirected shortly.'
                    });
                    this.faqForm.get("question").setValue("");
                    this.faqForm.get("answer").setValue("");

                    this.includePDF = false;

                    setTimeout(() => {
                        this.router.navigate(['cm/faq/manage'], {
                            queryParams: {
                                activeTab: 1
                            }
                        });
                    }, 1500);
                }

                this.loading = false;
            }, error => {
                this.messageService.add({
                    key: 'msgs', severity: 'error', summary: 'Error', detail: error
                });

                this.loading = false;
            });
        }
    }
}
