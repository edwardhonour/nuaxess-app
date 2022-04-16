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
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgLocalization } from '@angular/common';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit, OnDestroy {
  navigation: Navigation;
  isScreenSmall: boolean;
  term: any;
  p: any;
  tuploading: any;
  formFieldHelpers: string[] = [''];

    data: any;
    selectedProject: string = 'ACME Corp. Backend App';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    currentYear: any;
    email: any;
      //Upload 
  index: any;
    user: any;
    adding: any;
    addcont: any;
    employee_name: any;
    dob: any;
    editQQ: any;
    uploading: any;
    dsc: any;
    doc_title: any;
    inactive: any;
    active: any;
    history: any;
    comp: any;
    docs: any;
    qplans: any;
    aplans: any;
    
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
      private _formBuilder: FormBuilder,
      public http: HttpClient  // used by upload
  ) { }

  showHistory() {
    if (this.history=='Y') {
       this.history='N';
    } else {
      this.history='Y'
    }
  }
  
  showDocs() {
    if (this.docs=='Y') {
       this.docs='N';
    } else {
      this.docs='Y'
    }
  }

  showQPlans() {
    if (this.qplans=='Y') {
       this.qplans='N';
    } else {
      this.qplans='Y'
    }
  }

  showAPlans() {
    if (this.aplans=='Y') {
       this.aplans='N';
    } else {
      this.aplans='Y'
    }
  }

  showComp() {
    if (this.comp=='Y') {
       this.comp='N';
    } else {
      this.comp='Y'
    }
  }

  getProfile(id: any, status: any) {
    if (status=="Enrolled"||status=="enrolled"||status=="enrolling") {
      window.open(
        "https://myna-docs.com/api/get_quote_template.php?id="+id);
    }  else {
      window.open(
        "https://myna-docs.com/api/get_quote_template.php?id="+id);
    }
  }
    ngOnInit(): void
    {   
      this.docs='N';
      this.comp='N';
      this.dsc='';
      this.qplans='N';
      this.doc_title="";   
      this.editQQ='N';
      this.uploading='N';
      this.tuploading='N';
      this.inactive='N';
      this.active='N';
      this.history='N';
      this.aplans='N';
      this._activatedRoute.data.subscribe(({ 
        data, menudata, userdata })=> { 
          this.data=data;
          this.user=userdata;
          if (this.data.user.force_logout>0) {
            localStorage.removeItem('uid');
            this._router.navigate(['/forced-off',this.data.user.force_logout]);
        }
          this.navigation=menudata
          console.log(this.data)
      }) 
            this.adding='N';
            this.addcont='N';
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

    showUpload() {
      if (this.uploading=='Y') {
        this.uploading="N";
      } else {
        this.uploading="Y";
      }
    }

    editInvoice(id: any) {
      this._router.navigate(['/invoice-dashboard',id]);
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

    addEmployee() {
      if (this.adding=='N') {
        this.adding='Y';
        this.data.employeeData['id']="";
        this.data.employeeData['first_name']="";
        this.data.employeeData['middle_name']="";
        this.data.employeeData['last_name']="";
        this.data.employeeData['suffix']="";
        this.data.employeeData['email']="";
        this.data.employeeData['phone_mobile']="";
        this.data.employeeData['social_security_number']="";
        this.data.employeeData['date_of_birth']="";
        this.data.employeeData['gender']="";
      } else {
        this.adding='N';
        this.data.employeeData['id']="";
        this.data.employeeData['first_name']="";
        this.data.employeeData['middle_name']="";
        this.data.employeeData['last_name']="";
        this.data.employeeData['suffix']="";
        this.data.employeeData['email']="";
        this.data.employeeData['phone_mobile']="";
        this.data.employeeData['social_security_number']="";
        this.data.employeeData['date_of_birth']="";
        this.data.employeeData['gender']="";
      }
    }

    addLevel() {
      if (this.addcont=='N') {
        this.data.formData2['id']="";
        this.data.formData2['class_level']="";
        this.data.formData2['applicable_plan']="";
        this.data.formData2['coverage_level']="";
        this.data.formData2['value']="";
        this.addcont='Y';
      } else {
        this.addcont='N';
        this.data.formData2['id']="";
        this.data.formData2['class_level']="";
        this.data.formData2['applicable_plan']="";
        this.data.formData2['coverage_level']="";
        this.data.formData2['value']="";
      }
    }

    editLevel(id:any, class_level:any ,applicable_plan: any,coverage_level: any, value: any, type:any) {
      this.data.formData2['id']=id;
      this.data.formData2['class_level']=class_level;
      this.data.formData2['applicable_plan']=applicable_plan;
      this.data.formData2['coverage_level']=coverage_level;
      this.data.formData2['value']=value;
      this.data.formData2['type']=type;
      this.addcont='Y';
  }

    edit(id: any, employee_name: any, date_of_birth:any, gender: any) {
        this.data.formData['id']=id;
        this.data.formData['employee_name']=employee_name;
        this.data.formData['date_of_birth']=date_of_birth;
        this.data.formData['gender']=gender;
        this.adding='Y';
    }

    editBlur(id: any) {
      this.data.colForm['message_'+id]="";
    }

    deleteForm() {
      if (confirm('Are you sure you want to delete this employee?')) {
        this.data.formData['gender']="DELETE";
        this._dataService.postForm("post-add-employee-small", this.data).subscribe((data:any)=>{
          if (data.error_code=="0") {
            location.reload();
          } else {     
  //            this.error=data.error_message
          }
        });
      }

    }

    postForm() {
        this._dataService.postForm("post-add-employee-small", this.data['formData']).subscribe((data:any)=>{
          if (data.error_code=="0") {
            location.reload();
          } else {     
//            this.error=data.error_message
          }
        });
      }

      activatePlan(id:any, client_plan: any) {

        this.data.formData['id']=id;
        this.data.formData['id2']=client_plan;
        console.log(this.data.formData)
        if (confirm("Are you sure you want to activate this plan?  The enrollment information will be updated next time the Prism batch job runs.")) {
        this._dataService.postForm("post-activate-plan", this.data.formData).subscribe((data:any)=>{
          console.log(data)
          if (data.error_code=="0") {
            location.reload();
          } else {     
//            this.error=data.error_message
          }
        });
      }
      }

      inactivatePlan(id: any, client_plan: any) {
        this.data.formData['id']=id;
        this.data.formData['id2']=client_plan;
        if (confirm("Are you sure you want to inactivate this plan?  This will remove all census and plan historical data.")) {

        this._dataService.postForm("post-inactivate-plan", this.data.formData).subscribe((data:any)=>{
          if (data.error_code=="0") {
            location.reload();
          } else {     
//            this.error=data.error_message
          }
        });
      }
      }

      sendTestEmail() {
        this._dataService.postForm("send-test-email", this.data['formData']).subscribe((data:any)=>{
          if (data.error_code=="0") {
            location.reload();
          } else {     
//            this.error=data.error_message
          }
        });
      }

    postEmployee() {
      this._dataService.postForm("post-add-employee-small", this.data).subscribe((data:any)=>{
        if (data.error_code=="0") {
          location.reload();
        } else {     
//            this.error=data.error_message
        }
      });
    }

  editE(id: any,first_name: any, middle_name: any, last_name: any, suffix: any, email: any, phone_mobile: any, date_of_birth: any, social_security_number: any, gender: any) {
    if (this.adding=='N') {
      this.adding='Y';
    this.data.employeeData['id']=id;
    this.data.employeeData['first_name']=first_name;
    this.data.employeeData['middle_name']=middle_name;
    this.data.employeeData['last_name']=last_name;
    this.data.employeeData['suffix']=suffix;
    this.data.employeeData['email']=email;
    this.data.employeeData['phone_mobile']=phone_mobile;
    this.data.employeeData['social_security_number']=social_security_number;
    this.data.employeeData['date_of_birth']=date_of_birth;
    this.data.employeeData['gender']=gender;    
    } else {
    this.adding='N';
    this.data.employeeData['id']="";
    this.data.employeeData['first_name']="";
    this.data.employeeData['middle_name']="";
    this.data.employeeData['last_name']="";
    this.data.employeeData['suffix']="";
    this.data.employeeData['email']="";
    this.data.employeeData['phone_mobile']="";
    this.data.employeeData['social_security_number']="";
    this.data.employeeData['date_of_birth']="";
    this.data.employeeData['gender']="";
    }  
  }

editQuote() {
  if (this.editQQ=='N') {
    this.editQQ='Y'
  } else {
    this.editQQ='N'
  }
}

showInactive() {
if (this.inactive=='Y') {
   this.inactive='N';
} else {
  this.inactive='Y'
}
}

showActive() {
  if (this.active=='Y') {
     this.active='N';
  } else {
    this.active='Y'
  }
}
showTemplateUpload() {
  if (this.tuploading=='Y') {
    this.tuploading='N'
  } else {
    this.tuploading='Y'
  }
}

    postForm2() {
        this._dataService.postForm("post-add-level", this.data['formData2']).subscribe((data:any)=>{
          if (data.error_code=="0") {
            location.reload();
          } else {     
//            this.error=data.error_message
          }
        });
      }

      //------------------------------
      // Upload Form
      //------------------------------

      file=new FormControl('')
      file_data:any=''

      fileChange(index,event) {
        
        const fileList: FileList = event.target.files;
        //check whether file is selected or not
        if (fileList.length > 0) {
    
            const file = fileList[0];
            //get file information such as name, size and type
            console.log('finfo',file.name,file.size,file.type);
            //max file size is 8 mb
            if((file.size/1048576)<=8)
            {
              let formData = new FormData();
              formData.append('file', file, file.name);
              formData.append('company_id',this.data.id);
              formData.append('user_id',this.data.user.id);
              formData.append('dsc',this.dsc);
              formData.append('doc_title',this.doc_title);
              this.file_data=formData
              
            }else{
              alert('File size exceeds 8 MB. Please choose less than 8 MB');
            }
            
        }
    
      }
    
      ip="https://myna-docs.com/api/"
            
      uploadTemplate() {
        this._dataService.postTemplate(this.file_data).subscribe((data:any)=>{
          if (data.error_code==0) {
              console.log(data)
              window.open(
                "https://myna-docs.com/api/"+data.filename);
          }
        });   
      }

      uploadFile()
        {
          console.log(this.file_data);
          this.http.post(this.ip+'upload.php',this.file_data)
          .subscribe(res => {
            location.reload()
            console.log(res.toString)
          }, (err) => {
          //send error response
          alert('error occured')
        });
        }

        showDoc(id: any) {
          window.open('https://myna-docs.com/?id='+id,'_new')
        }

  }
  
