import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApexOptions } from 'ng-apexcharts';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { DataService } from 'app/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-user-enroll',
  templateUrl: './user-enroll.component.html',
  styleUrls: ['./user-enroll.component.scss']
})
export class UserEnrollComponent implements OnInit, OnDestroy {
  navigation: Navigation;
  isScreenSmall: boolean;
  term: any;
  p: any;
  formFieldHelpers: string[] = [''];
  error: any;
  strength: any;

  signUpForm: FormGroup;
  showAlert: boolean = false;

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
      this.strength=0;
            this._activatedRoute.data.subscribe(({ 
              data })=> { 
                this.data=data;
                if (this.data.error=='1') this._router.navigate(['/error'])
            }) 
              
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

  signUp() {

  }
    postForm() {

      this.error="";
      if (this.strength==0) {
        this.error="Passwords too weak - Must be at least 8 characters, have at least 1 uppercase, 1 lowercase, and 1 special character."
        return        
      }

      if (this.data['formData']['password'].length<8) {
        this.error="Passwords too short - Must be at least 8 characters"
        return
     } 
    
      if (this.data['formData']['password']!=this.data['formData']['password2']) {
         this.error="Passwords to not Match"
         return
      } 
      
      if (this.data['formData']['email']=="") {
        this.error="Email must be entered!"
        return
     } 

     if (this.data['formData']['phone_mobile']=="") {
      this.error="Phone number must be entered!"
      return
     } 

        this._dataService.postForm("post-enroll", this.data).subscribe((data:any)=>{
          if (data.error_code=="0") {
            this._router.navigate(['/sign-in'])
          } else {     
            this.error=data.error_message
          }
        });

  }
checkPwdStrength() {
  let password = this.data.formData['password']
  //let password = document.getElementById('PassEntry');
  let strengthBadge = document.getElementById('StrengthDisp');
  let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
  let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')

if(strongPassword.test(password)) {
    strengthBadge.style.backgroundColor = "green";
    strengthBadge.textContent = 'Strong';
    this.strength=1;
} else if(mediumPassword.test(password)) {
    strengthBadge.style.backgroundColor = 'blue';
    strengthBadge.textContent = 'Medium';
    this.strength=0;
} else {
    strengthBadge.style.backgroundColor = 'red';
    strengthBadge.textContent = 'Weak';
    this.strength=0;
}
}
}
