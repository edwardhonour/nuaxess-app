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
  selector: 'app-quote-request-dashboard',
  templateUrl: './quote-request-dashboard.component.html',
  styleUrls: ['./quote-request-dashboard.component.scss']
})
export class QuoteRequestDashboardComponent implements OnInit, OnDestroy {
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
    adding: any;
    mult: any;
    editQ: any;
    uploading: any;

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
addEmployee() {

}

editQuote() {

}
    ngOnInit(): void
    {      
      this.editQ='N';
this.adding='N';
this.mult='N';
this.uploading='N';
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

    submitQuote() {
      if (confirm('Are you sure you want to submit this quote?')) {


      this._dataService.postForm("post-submit-quote", this.data).subscribe((data:any)=>{
        if (data.error_code=="0") {
          location.reload()
        } else {     
//            this.error=data.error_message
        }
      });

    }

    }

    fixCont() {

    }
    toggleMult() {
        if (this.mult=='Y') {
            this.mult='N'
        } else {
            this.mult='Y'
        }
    }

    postCont(id: any) {
      this.data.colForm['save_id']=id;
      this._dataService.postForm("post-edit-quote-request", this.data).subscribe((data:any)=>{
        if (data.error_code=="0") {
            this.data=data.data.data;
            console.log(this.data)
//          this._router.navigate(['/org-dashboard',data.id])
        } else {     
//            this.error=data.error_message
        }
      });
    }

edit() {
  if (this.editQ=='N') {
     this.editQ='Y'
  } else {
     this.editQ='N'
  }

}

make() {
  this._dataService.postForm("post-make-plans", this.data['formData']).subscribe((data:any)=>{
    if (data.error_code=="0") {
//            this._router.navigate(['/org-dashboard',data.id])
        location.reload()
    } else {     
//            this.error=data.error_message
    }
  });
}

submit() {
  if (confirm('Are you sure you want to submit this quote request?')) {

  this._dataService.postForm("submit-quote-request", this.data['formData']).subscribe((data:any)=>{
    if (data.error_code=="0") {
//            this._router.navigate(['/org-dashboard',data.id])
        location.reload()
    } else {     
//            this.error=data.error_message
    }
  });

      
}
}

    postForm() {
        this._dataService.postForm("post-edit-quote-background", this.data['formData']).subscribe((data:any)=>{
          if (data.error_code=="0") {
//            this._router.navigate(['/org-dashboard',data.id])
              location.reload()
          } else {     
//            this.error=data.error_message
          }
        });
      }

}
