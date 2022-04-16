import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { AdminDashboardComponent } from './nuaxess/admin-dashboard/admin-dashboard.component';
import { AuthGuardOriginal } from './auth.guard';
import { DataResolver, EnrollResolver, MenuResolver, UserResolver } from './data.resolver';
import { AddUserComponent } from './nuaxess/add-user/add-user.component';
import { UserListComponent } from './nuaxess/user-list/user-list.component';
import { UserDashboardComponent } from './nuaxess/user-dashboard/user-dashboard.component';
import { AddOrgComponent } from './nuaxess/add-org/add-org.component';
import { AddCompanyComponent } from './nuaxess/add-company/add-company.component';
import { CompanyListComponent } from './nuaxess/company-list/company-list.component';
import { CompanyDashboardComponent } from './nuaxess/company-dashboard/company-dashboard.component';
import { AddQuoteComponent } from './nuaxess/add-quote/add-quote.component';
import { QuoteListComponent } from './nuaxess/quote-list/quote-list.component';
import { QuoteDashboardComponent } from './nuaxess/quote-dashboard/quote-dashboard.component';
import { AddQuoteRequestComponent } from './nuaxess/add-quote-request/add-quote-request.component';
import { QuoteRequestListComponent } from './nuaxess/quote-request-list/quote-request-list.component';
import { QuoteRequestDashboardComponent } from './nuaxess/quote-request-dashboard/quote-request-dashboard.component';
import { EditCompanyComponent } from './nuaxess/edit-company/edit-company.component';
import { EditUserComponent } from './nuaxess/edit-user/edit-user.component';
import { EditQuoteComponent } from './nuaxess/edit-quote/edit-quote.component';
import { UserEnrollComponent } from './nuaxess/user-enroll/user-enroll.component';
import { BadminComponent } from './nuaxess/badmin/badmin.component';
import { EmployeeDashboardComponent } from './nuaxess/employee-dashboard/employee-dashboard.component';
import { InvalidTokenComponent } from './nuaxess/invalid-token/invalid-token.component';
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
import { UserSettingsComponent } from './nuaxess/user-settings/user-settings.component';
import { UserProfileComponent } from './nuaxess/user-profile/user-profile.component';
import { UserLogoutComponent } from './nuaxess/user-logout/user-logout.component';
import { AddBrokerComponent } from './nuaxess/add-broker/add-broker.component';
import { BrokerListComponent } from './nuaxess/broker-list/broker-list.component';
import { CommissionListComponent } from './nuaxess/commission-list/commission-list.component';
import { CommissionDashboardComponent } from './nuaxess/commission-dashboard/commission-dashboard.component';
import { ProspectListComponent } from './nuaxess/prospect-list/prospect-list.component';
import { ProspectDashboardComponent } from './nuaxess/prospect-dashboard/prospect-dashboard.component';
import { OrgProfileComponent } from './nuaxess/org-profile/org-profile.component';
import { PlanListComponent } from './nuaxess/plan-list/plan-list.component';
import { AdditionlistComponent } from './nuaxess/additionlist/additionlist.component';
import { TerminationListComponent } from './nuaxess/termination-list/termination-list.component';
import { AdditionListComponent } from './nuaxess/addition-list/addition-list.component';
import { MemberListComponent } from './nuaxess/member-list/member-list.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [


    {path: '', pathMatch : 'full', redirectTo: 'sign-in'},

    // Redirect signed in user to the '/dashboards/project'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'sign-in'},

    // Auth routes for guests
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'enroll/:id', component: UserEnrollComponent, resolve: { data: EnrollResolver }, },
            {path: 'e/:id', component: UserEnrollComponent, resolve: { data: EnrollResolver }, },
            {path: 'e', component: UserEnrollComponent, resolve: { data: EnrollResolver }, },
            {path: 'forced-off/:id', component: ForcedLogoutComponent },
            {path: 'forced-off', component: ForcedLogoutComponent },
            {path: 'sign-in', component: NewSigninComponent },
            {path: 'error', component: InvalidTokenComponent },
            {path: 'enroll', component: UserEnrollComponent, resolve: { data: EnrollResolver }, }
        ]
    },
    {
        path: '',
        canActivate: [AuthGuardOriginal],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)},
            //-- Home
            {path: 'sadmin', component: AdminDashboardComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'user-logout', component: UserLogoutComponent },
            //-- Company
            {path: 'company-list', component: CompanyListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'company-list/:id', component: CompanyListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'admin-company-list', component: CompanyListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'admin-company-list/:id', component: CompanyListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            //-- Prospect
            {path: 'prospect-list', component: ProspectListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'prospect-list/:id', component: ProspectListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'admin-prospect-list', component: ProspectListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'admin-prospect-list/:id', component: ProspectListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            //-- Enrolling
            {path: 'enrolling-list', component: CompanyListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'enrolling-list/:id', component: CompanyListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'admin-enrolling-list', component: CompanyListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'admin-enrolling-list/:id', component: CompanyListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'plan-list', component: PlanListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'member-list', component: MemberListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            //-- Quotes
            {path: 'quote-list', component: QuoteListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'quote-list/:id', component: QuoteListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'quote-list/:id/:id2', component: QuoteListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'admin-quote-list', component: QuoteListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'admin-quote-list/:id', component: QuoteListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'admin-quote-list/:id/:id2', component: QuoteListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'addition-list', component: AdditionListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'termination-list', component: TerminationListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'termination-list', component: TerminationListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            //-- Commissions
            {path: 'commission-list', component: CommissionListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'admin-commission-list', component: CommissionListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            //-- Invoices
            {path: 'invoice-list', component: InvoiceListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'admin-invoice-list', component: InvoiceListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            //-- Brokers
            {path: 'broker-list', component: BrokerListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            //-- Users
            {path: 'user-list', component: UserListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'user-list/:id', component: UserListComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            //-- Adds
            {path: 'add-broker', component: AddBrokerComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'add-company', component: AddCompanyComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'add-company/:id', component: AddCompanyComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'add-company/:id/:id2', component: AddCompanyComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'add-prospect', component: AddCompanyComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'add-prospect/:id', component: AddCompanyComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'add-prospect/:id/:id2', component: AddCompanyComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'add-user/:id', component: AddUserComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'add-user/:id/:id2', component: AddUserComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'add-quote/:id', component: AddQuoteComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'add-quote-request/:id', component: AddQuoteRequestComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            //-- Edits
            {path: 'edit-company/:id', component: EditCompanyComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'edit-user/:id', component: EditUserComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'edit-quote-request/:id', component: EditQuoteComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'user-settings', component: UserSettingsComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'user-profile', component: UserProfileComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            //-- Dashboard
            {path: 'company-dashboard/:id', component: CompanyDashboardComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'company-dashboard/:id/:id2', component: CompanyDashboardComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'prospect-dashboard/:id', component: ProspectDashboardComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'prospect-dashboard/:id/:id2', component: ProspectDashboardComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'user-dashboard/:id', component: UserDashboardComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'user-dashboard/:id/:id2', component: UserDashboardComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'invoice-dashboard/:id', component: InvoiceDashboardComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'commission-dashboard/:id', component: CommissionDashboardComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'quote-dashboard/:id', component: QuoteRequestDashboardComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'quote-dashboard/:id/:id2', component: QuoteRequestDashboardComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'employee-dashboard/:id', component: EmployeeDashboardComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'employee-dashboard/:id/:id2', component: EmployeeDashboardComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            //-- Searches
            {path: 'employee-lookup', component: EmployeeLookupComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'member-lookup', component: MemberLookupComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'census-history/:id/:id2', component: CensusHistoryComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'current-census', component: CurrentCensusComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'current-census/:id', component: CurrentCensusComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'current-terminations', component: CurrentTerminationsComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'current-terminations/:id', component: CurrentTerminationsComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'current-additions', component: CurrentAdditionsComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'additions-list', component: CurrentAdditionsComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'current-additions/:id', component: CurrentAdditionsComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'additions-list/:id', component: CurrentAdditionsComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            //-- Alt Homes
            {path: 'broker-home', component: BrokerHomeComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            {path: 'badmin', component: AdminDashboardComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },
            //-- Enrollment
            {path: 'enroll/:id', component: UserEnrollComponent, resolve: { data: EnrollResolver }, },
            {path: 'org-profile', component: OrgProfileComponent, resolve: { menudata: MenuResolver, data: DataResolver, userdata: UserResolver }, },           
            {path: 'enroll', component: UserEnrollComponent, resolve: { data: EnrollResolver }, }
        ]
    },
    {
        path: '',
        component  : LayoutComponent,
        data: {
            layout: 'empty'
        },
        children   : [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
        ]
    },

    // Admin routes
    {
        path       : '',
         component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            // Pages
            {path: 'pages', children: [
                {path: 'error', children: [
                    {path: '404', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module)},
                    {path: '500', loadChildren: () => import('app/modules/admin/pages/error/error-500/error-500.module').then(m => m.Error500Module)}
                ]},
            ]},

            // 
            {path: 'ui', children: [
                {path: 'forms', children: [
                    {path: 'fields', loadChildren: () => import('app/modules/admin/ui/forms/fields/fields.module').then(m => m.FormsFieldsModule)},
                ]},
            ]},
            {path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module)},
            {path: '**', redirectTo: '404-not-found'}
        ]
    }
];
