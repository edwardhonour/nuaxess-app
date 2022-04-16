import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApexOptions } from 'ng-apexcharts';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { DataService } from 'app/data.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {
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
    error: any;

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
                    
            this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
            this.error="";
              
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

    validateEmail() {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.data.formData.email);
    }
  
    validatePhone() {
      const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      return re.test(this.data.formData.phone_mobile);
    }

    postForm() {

      //-- Error Checking

    this.error='';
    if (this.data.formData.role=="") { this.error+="Role Must Be Selected"}
    if (this.data.formData.full_name=="") {
      if (this.error!='') {
         this.error+=", Full Name must be Entered"
      } else {
        this.error+="Full Name must be Entered"
      } 
    }

    if (this.data.formData.email=="") {
      if (this.error!='') {
         this.error+=", Email must be Entered"
      } else {
        this.error+="Email must be Entered"
      } 
    } else {
        if (!this.validateEmail()) {
            if (this.error!='') {
              this.error+=", Invalid EMAIL Format"
            } else {
              this.error+="Invalid EMAIL Format"
            }           
        }
    }

    if (this.data.formData.phone_mobile=="") {

    } else {
        if (!this.validatePhone()) {
            if (this.error!='') {
              this.error+=", Invalid PHONE Format (use digits only no spaces)"
            } else {
              this.error+="Invalid PHONE Format  (use digits only no spaces)" 
            }           
        }
    }

    if (this.error=='') {
      this._dataService.postForm("post-add-user", this.data).subscribe((data:any)=>{
        if (data.error_code=="0") {
          this._router.navigate(['/user-dashboard',data.id])
        } else {     
          this.error=data.error_message
        }
      });
    }
    }

}
