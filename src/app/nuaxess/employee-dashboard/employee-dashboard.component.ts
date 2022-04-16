import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApexOptions } from 'ng-apexcharts';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { DataService } from 'app/data.service';
//===================================================
// UPLOAD GRAB #1
//===================================================
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//===================================================
// END UPLOAD GRAB #1
//===================================================

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit, OnDestroy {
  navigation: Navigation;
  isScreenSmall: boolean;
  term: any;
  showterm: any;
  p: any;
  formFieldHelpers: string[] = [''];
  adding: any;
  qedit: any;

    data: any;
    selectedProject: string = 'ACME Corp. Backend App';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    currentYear: any;
    email: any;
    user: any;
    editing: any;
    addF: any;
//===================================================
// UPLOAD GRAB #2
//===================================================
    uploading: any;
    index: any;
    dsc: any;
    doc_title: any;
//===================================================
// END UPLOAD GRAB #2
//===================================================

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
//===================================================
// UPLOAD GRAB #3
//===================================================
      private _formBuilder: FormBuilder,
      public http: HttpClient  // used by upload
//===================================================
// END UPLOAD GRAB #3
//===================================================

  ) { }

  
    addFamily() {
        if (this.addF=='Y') {
          this.addF='N'
        } else {
          this.addF='Y'
        }
    }
   
    fixCont() {
      if (this.qedit=='Y') {
        this.qedit='N'
      } else {
        this.qedit='Y'
      }
  }

    editFamily(id: any, first_name: any, middle_name: any, last_name: any, gender: any, member_type: any, date_of_birth: any, height: any, weight: any) {
        this.data.formData['id']=id;
        this.data.formData['first_name']=first_name;
        this.data.formData['middle_name']=middle_name;
        this.data.formData['last_name']=last_name;
        this.data.formData['gender']=gender;
        this.data.formData['member_type']=member_type;
        this.data.formData['date_of_birth']=date_of_birth;
        this.data.formData['height']=height;
        this.data.formData['weight']=weight;
    }

    ngOnInit(): void
    {      
     //===================================================
    // UPLOAD GRAB #4
    //===================================================
      this.dsc='';    
      this.doc_title='';        
      this.uploading='N';
      this.showterm='N';
     //===================================================
    // END UPLOAD GRAB #4
    //===================================================
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
           this.editing='N';
           this.addF='N';
           this.qedit='N';
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

    toggleEdit() {
      if (this.editing=='Y') {
          this.editing='N'
      } else {
          this.editing='Y'
      }
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

    notifySMS() {

    }

    notifyEMAIL() {

    }
  
    addEmployee () {

    }

    termEmployee(id: any, plan:any) {
        if (this.showterm=="N") {
          this.data['termData'].plan_id=plan;
          this.data['termData'].id=id;
          this.showterm="Y";
        } else {
          this.showterm="N";
          this.data['termData'].plan_id="";
          this.data['termData'].id="";
        }
    }

    postTerm() {
       if (confirm('Are you sure you want to terminate this plan?')) {
        this._dataService.postForm("post-term-plan", this.data.termData).subscribe((data:any)=>{
          if (data.error_code=="0") {
            location.reload();
  //            this._router.navigate(['/org-dashboard',data.id])
          } else {     
  //            this.error=data.error_message
          }
        });         
       }
    }

    postAddFamily() {
      this._dataService.postForm("post-add-family", this.data).subscribe((data:any)=>{
        if (data.error_code=="0") {
          location.reload();
//            this._router.navigate(['/org-dashboard',data.id])
        } else {     
//            this.error=data.error_message
        }
      });
    }

    postCont() {
      this._dataService.postForm("post-edit-cont", this.data).subscribe((data:any)=>{
        if (data.error_code=="0") {
          location.reload();
//            this._router.navigate(['/org-dashboard',data.id])
        } else {     
//            this.error=data.error_message
        }
      });
    }

    postForm() {
        this._dataService.postForm("post-edit-employee", this.data).subscribe((data:any)=>{
          if (data.error_code=="0") {
            location.reload();
//            this._router.navigate(['/org-dashboard',data.id])
          } else {     
//            this.error=data.error_message
          }
        });
      }

      //------------------------------
      // Upload Form
      //------------------------------

    //===================================================
    // UPLOAD GRAB #5
    //===================================================

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
              formData.append('employee_id',this.data.id);
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
        
        showUpload() {
          if (this.uploading=='Y') {
            this.uploading="N";
          } else {
            this.uploading="Y";
          }
        }
//===================================================
// END UPLOAD GRAB #5
//===================================================
  }
  
