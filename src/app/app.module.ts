import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { NgxTablePaginationModule } from 'ngx-table-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { FuseFullscreenModule } from '@fuse/components/fullscreen/fullscreen.module';
import { LanguagesModule } from 'app/layout/common/languages/languages.module';
import { MessagesModule } from 'app/layout/common/messages/messages.module';
import { NotificationsModule } from 'app/layout/common/notifications/notifications.module';
import { QuickChatModule } from 'app/layout/common/quick-chat/quick-chat.module';
import { SearchModule } from 'app/layout/common/search/search.module';
import { ShortcutsModule } from 'app/layout/common/shortcuts/shortcuts.module';
import { UserModule } from 'app/layout/common/user/user.module';
import { SharedModule } from 'app/shared/shared.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AdminDashboardComponent } from './nuaxess/admin-dashboard/admin-dashboard.component';
import { VerticalMenuComponent } from './nuaxess/vertical-menu/vertical-menu.component';
import { TopMenuComponent } from './nuaxess/top-menu/top-menu.component';
import { AddUserComponent } from './nuaxess/add-user/add-user.component';
import { UserDashboardComponent } from './nuaxess/user-dashboard/user-dashboard.component';
import { AddOrgComponent } from './nuaxess/add-org/add-org.component';
import { UserListComponent } from './nuaxess/user-list/user-list.component';
import { AddCompanyComponent } from './nuaxess/add-company/add-company.component';
import { CompanyListComponent } from './nuaxess/company-list/company-list.component';
import { CompanyDashboardComponent } from './nuaxess/company-dashboard/company-dashboard.component';
import { QuoteListComponent } from './nuaxess/quote-list/quote-list.component';
import { QuoteDashboardComponent } from './nuaxess/quote-dashboard/quote-dashboard.component';
import { AddQuoteComponent } from './nuaxess/add-quote/add-quote.component';
import { AddQuoteRequestComponent } from './nuaxess/add-quote-request/add-quote-request.component';
import { QuoteRequestListComponent } from './nuaxess/quote-request-list/quote-request-list.component';
import { QuoteRequestDashboardComponent } from './nuaxess/quote-request-dashboard/quote-request-dashboard.component'

import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { FormsFieldsComponent } from 'app/modules/admin/ui/forms/fields/fields.component';
import { EditUserComponent } from './nuaxess/edit-user/edit-user.component';
import { EditCompanyComponent } from './nuaxess/edit-company/edit-company.component';
import { EditQuoteComponent } from './nuaxess/edit-quote/edit-quote.component';
import { UserEnrollComponent } from './nuaxess/user-enroll/user-enroll.component';
import { BadminComponent } from './nuaxess/badmin/badmin.component';
import { EmployeeDashboardComponent } from './nuaxess/employee-dashboard/employee-dashboard.component';
import { FuseCardComponent, FuseCardModule } from '@fuse/components/card';
import { InvalidTokenComponent } from './nuaxess/invalid-token/invalid-token.component';
import { AddBrokerComponent } from './nuaxess/add-broker/add-broker.component';
import { EditBrokerComponent } from './nuaxess/edit-broker/edit-broker.component';
import { ForcedLogoutComponent } from './nuaxess/forced-logout/forced-logout.component';
import { NewSigninComponent } from './nuaxess/new-signin/new-signin.component';
import { MemberLookupComponent } from './nuaxess/member-lookup/member-lookup.component';
import { EmployeeLookupComponent } from './nuaxess/employee-lookup/employee-lookup.component';
import { InvoiceDashboardComponent } from './nuaxess/invoice-dashboard/invoice-dashboard.component';
import { InvoiceListComponent } from './nuaxess/invoice-list/invoice-list.component';
import { CensusHistoryComponent } from './nuaxess/census-history/census-history.component';
import { BrokerHomeComponent } from './nuaxess/broker-home/broker-home.component';
import { CurrentCensusComponent } from './nuaxess/current-census/current-census.component';
import { CurrentTerminationsComponent } from './nuaxess/current-terminations/current-terminations.component';
import { CurrentAdditionsComponent } from './nuaxess/current-additions/current-additions.component';
import { UserProfileComponent } from './nuaxess/user-profile/user-profile.component';
import { UserSettingsComponent } from './nuaxess/user-settings/user-settings.component';
import { UserLogoutComponent } from './nuaxess/user-logout/user-logout.component';
import { CommissionListComponent } from './nuaxess/commission-list/commission-list.component';
import { CommissionDashboardComponent } from './nuaxess/commission-dashboard/commission-dashboard.component';
import { BrokerListComponent } from './nuaxess/broker-list/broker-list.component';
import { ProspectListComponent } from './nuaxess/prospect-list/prospect-list.component';
import { ProspectDashboardComponent } from './nuaxess/prospect-dashboard/prospect-dashboard.component';
import { OrgProfileComponent } from './nuaxess/org-profile/org-profile.component';
import { PlanListComponent } from './nuaxess/plan-list/plan-list.component';
import { AdditionlistComponent } from './nuaxess/additionlist/additionlist.component';
import { AdditionListComponent } from './nuaxess/addition-list/addition-list.component';
import { TerminationListComponent } from './nuaxess/termination-list/termination-list.component';
import { MemberListComponent } from './nuaxess/member-list/member-list.component';

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent,
        AdminDashboardComponent,
        VerticalMenuComponent,
        TopMenuComponent,
        AddUserComponent,
        UserDashboardComponent,
        AddOrgComponent,
        UserListComponent,
        AddCompanyComponent,
        CompanyListComponent,
        CompanyDashboardComponent,
        QuoteListComponent,
        QuoteDashboardComponent,
        AddQuoteComponent,
        AddQuoteRequestComponent,
        QuoteRequestListComponent,
        QuoteRequestDashboardComponent,
        EditUserComponent,
        EditCompanyComponent,
        EditQuoteComponent,
        UserEnrollComponent,
        BadminComponent,
        EmployeeDashboardComponent,
        InvalidTokenComponent,
        AddBrokerComponent,
        EditBrokerComponent,
        ForcedLogoutComponent,
        NewSigninComponent,
        MemberLookupComponent,
        EmployeeLookupComponent,
        InvoiceDashboardComponent,
        InvoiceListComponent,
        CensusHistoryComponent,
        BrokerHomeComponent,
        CurrentCensusComponent,
        CurrentTerminationsComponent,
        CurrentAdditionsComponent,
        UserProfileComponent,
        UserSettingsComponent,
        UserLogoutComponent,
        CommissionListComponent,
        CommissionDashboardComponent,
        BrokerListComponent,
        ProspectListComponent,
        ProspectDashboardComponent,
        OrgProfileComponent,
        PlanListComponent,
        AdditionlistComponent,
        AdditionListComponent,
        TerminationListComponent,
        MemberListComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
  //      FuseMockApiModule.forRoot(mockApiServices),
        FuseFullscreenModule,
        FuseHighlightModule,
        FuseLoadingBarModule,
        FuseNavigationModule,
        FuseCardModule,
        LayoutModule,
        LanguagesModule,
        MatButtonModule,
        MatChipsModule,
        MatFormFieldModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatInputModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatRippleModule,
        MatSidenavModule,
        MatSortModule,
        MatSelectModule,
        MatTableModule,
        MatTabsModule,
        MessagesModule,
        MatMomentDateModule,
        NgxTablePaginationModule,
        Ng2SearchPipeModule,
        NgApexchartsModule,
        NotificationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),
        QuickChatModule,
        SearchModule,
        ShortcutsModule,
        UserModule,
        SharedModule,
        MarkdownModule.forRoot({})
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
