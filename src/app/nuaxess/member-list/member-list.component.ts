import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApexOptions } from 'ng-apexcharts';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { DataService } from 'app/data.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
export interface Contact
{
    id: string;
    avatar?: string | null;
    background?: string | null;
    name: string;
    emails?: {
        email: string;
        label: string;
    }[];
    phoneNumbers?: {
        country: string;
        phoneNumber: string;
        label: string;
    }[];
    title?: string;
    company?: string;
    birthday?: string | null;
    address?: string | null;
    notes?: string | null;
    tags: string[];
}

export interface Country
{
    id: string;
    iso: string;
    name: string;
    code: string;
    flagImagePos: string;
}

export interface Tag
{
    id?: string;
    title?: string;
}

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit, OnDestroy {
  
  

  contactsCount: number = 0;
  contactsTableColumns: string[] = ['name', 'email', 'phoneNumber', 'job'];
  countries: Country[];
  drawerMode: 'side' | 'over';
  searchInputControl: FormControl = new FormControl();
  selectedContact: Contact;
  navigation: Navigation;
  isScreenSmall: boolean;
  term: any;
  p: any;
  formFieldHelpers: string[] = [''];

    data: any;
    selectedProject: string = 'ACME Corp. Backend App';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    currentYear: any;
    email: any;
    user: any;

    /**
     * Constructor
     */

     constructor(
      private _activatedRoute: ActivatedRoute,
      private _router: Router,
      private _navigationService: NavigationService,
      private _fuseMediaWatcherService: FuseMediaWatcherService,
      private _fuseNavigationService: FuseNavigationService,
      private _dataService: DataService,
      private _formBuilder: FormBuilder
  ) { }

    ngOnInit(): void
    {      

            this._activatedRoute.data.subscribe(({ 
              data, menudata, userdata })=> { 
                this.data=data;
                if (this.data.user.force_logout>0) {
                  localStorage.removeItem('uid');
                  this._router.navigate(['/forced-off',this.data.user.force_logout]);
              }
                this.user=userdata;
                this.navigation=menudata
                console.log(data)
            }) 
            
            this._dataService.getVerticalMenu()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data: Navigation)=> {             
                    this.navigation=data
            })  
    
//            this._dataService.getUser()
//            .pipe(takeUntil(this._unsubscribeAll))
//            .subscribe((user: any)=> {             
//                    this.user=user
//            })  
          
            this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
              
    }
    createContact() {

    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private _fixSvgFill(element: Element): void
    {
        // Current URL
        const currentURL = this._router.url;

        // 1. Find all elements with 'fill' attribute within the element
        // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
        // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
        Array.from(element.querySelectorAll('*[fill]'))
             .filter(el => el.getAttribute('fill').indexOf('url(') !== -1)
             .forEach((el) => {
                 const attrVal = el.getAttribute('fill');
                 el.setAttribute('fill', `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`);
             });
    }

    /**
     * Prepare the chart data from the data
     *
     * @private
     */
     onBackdropClicked(): void
     {
         // Go back to the list
         this._router.navigate(['./'], {relativeTo: this._activatedRoute});
 
         // Mark for check
        // this._changeDetectorRef.markForCheck();
     }
 
    toggleNavigation(name: string): void
    {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if ( navigation )
        {
            // Toggle the opened status
            navigation.toggle();
        }
    }

    getFormFieldHelpersAsString(): string
    {
        return this.formFieldHelpers.join(' ');
    }

    showInvoice(id: any, month_id: any) {
      window.open(
        "https://myna-api.com/api/pdf1.php?id="+id+"&display=B"+"&month_id="+this.data.month_id, "_blank");
    }

    postForm() {
        this._dataService.postForm("post-add-org", this.data).subscribe((data:any)=>{
          if (data.error_code=="0") {
            this._router.navigate(['/org-dashboard',data.id])
          } else {     
//            this.error=data.error_message
          }
        });
      }

}
