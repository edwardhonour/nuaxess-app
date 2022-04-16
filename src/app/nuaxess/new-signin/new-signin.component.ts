import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-new-signin',
  templateUrl: './new-signin.component.html',
  styleUrls: ['./new-signin.component.scss']
})
export class NewSigninComponent implements OnInit {
  @ViewChild('signInNgForm') signInNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
      type   : 'success',
      message: ''
  };
  signInForm: FormGroup;
  showAlert: boolean = false;

  /**
   * Constructor
   */
  constructor(
      private _activatedRoute: ActivatedRoute,
      private _authService: AuthService,
      private _formBuilder: FormBuilder,
      private _router: Router,
      private _dataService: DataService
  )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
      //----------------------------------------------------------------
      // CHANGE THIS VARIABLE TO 'Y' WHEN MOVING TO PRODUCION 
      // CHANGE THIS VARIABLE TO 'N' WHEN IN DEVELOPMENT AND TESTING
      //----------------------------------------------------------------
      let production='N'
      if (production=='Y') {
        localStorage.removeItem('uid')
        localStorage.removeItem('role')
        location.replace('https://mynuaxess.com/#/sign-in')
      } else {

        this.signInForm = this._formBuilder.group({
          email     : ['', [Validators.required]],
          password  : ['', Validators.required],
          rememberMe: ['']
      });

     if (localStorage.getItem('uid')!==undefined) {
       //-- Super Admin
      if (localStorage.getItem('role')=="sadmin") { 
          this._router.navigateByUrl('/sadmin'); 
          location.replace('/#/sadmin');
      }
      if (localStorage.getItem('role')=="employer") { 
          this._router.navigateByUrl('/sadmin'); 
          location.replace('/#/sadmin');
      }
      //-- PEO Admnn
      if (localStorage.getItem('role')=="padmin") { 
         // location.replace('https://mynuaxess.com/peo/#/sadmin');
         location.replace('/#/sadmin');
        }
      if (localStorage.getItem('role')=="badmin") { 
          this._router.navigateByUrl('/badmin'); 
          location.replace('/#/badmin');
        }
      if (localStorage.getItem('role')=="broker") { 
          this._router.navigateByUrl('/badmin'); 
          location.replace('/#/badmin');
        }
      if (localStorage.getItem('role')=="eadmin") { 
          this._router.navigateByUrl('/eadmin'); 
          location.replace('/#/eadmin');
        }
      if (localStorage.getItem('role')=="employee") { 
          this._router.navigate(['/dashboard']) 
          location.replace('/#/dashboard');
        }
      if (localStorage.getItem('role')=="user") { 
          this._router.navigate(['/sadmin']) 
          location.replace('/#/sadmin');
        }
     }
    }

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   */
   signIn(): void
   {
       if ( this.signInForm.invalid )
       {
           return;
       }

       this.signInForm = this._formBuilder.group({
          email     : ['', [Validators.required, Validators.email]],
          password  : ['', Validators.required],
          rememberMe: ['']
      });

       this.signInForm.disable();
       this.showAlert = false;
   }
                      
            setUID(): void {
              localStorage.setItem('uid','999')
              this._router.navigate(['/active-claims'])
          }
          
  postForm() {
  
      // Return if the form is invalid
      if ( this.signInForm.invalid )
      {
          return;
      }

      // Disable the form
      this.signInForm.disable();

      // Hide the alert
      this.showAlert = false;

            this._dataService.postLogin(this.signInForm.value['email'], this.signInForm.value['password']).subscribe((data:any)=>{
              if (data.error_code=="0") {
                console.log(data)
                localStorage.setItem('uid',data.uid)
                localStorage.setItem('role',data.role)
                this.signIn()
                if (data.role=="sadmin") { 
                    this._router.navigateByUrl('/sadmin'); 
                    location.replace('/#/sadmin');
                  }
                  if (data.role=="padmin") { 
                    this._router.navigateByUrl('/sadmin'); 
//                    location.replace('https://mynuaxess.com/peo/#/sadmin');
                      location.replace('/#/sadmin');
                  }
                  
                if (data.role=="badmin") { 
                    this._router.navigateByUrl('/badmin'); 
                    location.replace('/#/badmin');
                  }
                if (data.role=="broker") { 
                    this._router.navigateByUrl('/badmin'); 
                    location.replace('/#/badmin');
                  }
                if (data.role=="eadmin") { 
                    this._router.navigateByUrl('/eadmin'); 
                    location.replace('/#/eadmin');
                  }
                if (data.role=="employee") { 
                    this._router.navigate(['/dashboard']) 
                    location.replace('/#/dashboard');
                  }
                if (data.role=="employer") { 
                    this._router.navigate(['/sadmin']) 
                    location.replace('/#/sadmin');
                  }
              } else {      
                  this.signInForm.enable();
                  this.signInNgForm.resetForm();
                  this.alert = {
                      type   : 'error',
                      message: 'Wrong email or password'
                  };
                  this.showAlert = true;
              }
            });
  }
          
}
