import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionModule } from 'primeng/accordion'
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataScrollerModule } from 'primeng/datascroller';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { GrowlModule } from 'primeng/growl';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SharedModule } from '../../shared/shared.module';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { FORoutingModule } from './fo-routing.module';
import { FOComponent } from './pages/fo.component';
import { FODashboardComponent } from './pages/fo-dashboard/fo-dashboard.component';
import { FOEditOnboardComponent } from './pages/fo-edit-onboard/fo-edit-onboard.component';
import { FOManageOnboardComponent } from './pages/fo-manage-onboard/fo-manage-onboard.component';
import { FONewOnboardComponent } from './pages/fo-new-onboard/fo-new-onboard.component';
import { FOService } from '../../core/services/fo.service';
import { FOFaqViewAllComponent } from './pages/fo-faq-viewall/fo-faq-viewall.component';
import { FOFaqMyQuestionsComponent } from './pages/fo-faq-myquestions/fo-faq-myquestions.component';
import { FOViewPDFComponent } from './pages/fo-view-pdf/fo-view-pdf.component';
import { CanDeactivateGuard } from '../../core/can-deactivate/can-deactivate.guard';

import { UiModule } from '../../ui/ui.module';
import { changeToNA } from '../fo/pages/fo-edit-onboard/fo-edit-onboard.component'

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
}

@NgModule({
    imports: [
        AccordionModule,
        ButtonModule,
        CardModule,
        CalendarModule,
        ChartModule,
        CheckboxModule,
        FORoutingModule,
        CommonModule,
        ConfirmDialogModule,
        DataScrollerModule,
        DialogModule,
        DropdownModule,
        FormsModule,
        GrowlModule,
        InputTextModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        NgbModule.forRoot(),
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PerfectScrollbarModule,
        ProgressBarModule,
        ProgressSpinnerModule,
        ReactiveFormsModule,
        ScrollPanelModule,
        SharedModule,
        TableModule,
        TabViewModule,
        ToastModule,
        TooltipModule,
        UiModule
    ],
    declarations: [
        FOComponent,
        FODashboardComponent,
        FONewOnboardComponent,
        FOEditOnboardComponent,
        FOManageOnboardComponent,
        FOFaqViewAllComponent,
        FOFaqMyQuestionsComponent,
        FOViewPDFComponent,
        changeToNA
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        CanDeactivateGuard,
        ConfirmationService,
        FOService,
        MessageService
    ]
})

export class FOModule { }
