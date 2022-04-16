import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApexOptions } from 'ng-apexcharts';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { DataService } from 'app/data.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-org-profile',
  templateUrl: './org-profile.component.html',
  styleUrls: ['./org-profile.component.scss']
})
export class OrgProfileComponent implements OnInit, OnDestroy {
  navigation: Navigation;
  isScreenSmall: boolean;
  term: any;
  p: any;
  formFieldHelpers: string[] = [''];
  uploading: any;
  editing: any;
        //Upload 
        index: any;

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
      private _formBuilder: FormBuilder,
      public http: HttpClient  // used by upload
  ) { }

    ngOnInit(): void
    {      
            this.editing='N'
            this.uploading='N'
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

    showEdit() {
      if (this.editing=='Y') {
        this.editing='N'
      } else {
        this.editing='Y'
      }
    }

    showUpload() {
      if (this.uploading=='Y') {
        this.uploading='N'
      } else {
        this.uploading='Y'
      }
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

    notifySMS() {
      if (confirm("Are you sure you want to send this invitation using SMS?")) {


      this._dataService.postForm("send-invite", this.data).subscribe((data:any)=>{
        if (data.error_code=="0") {
              alert('SMS Message Sent')
        } else {     
          alert('ERROR: SMS Message WAS NOT Sent!')
        }
      });
    
    }

    }

    notifyEmail() {

      if (confirm("Are you sure you want to send this invitation using Email?")) {

        this._dataService.postForm("admin-invite", this.data).subscribe((data:any)=>{
          if (data.error_code=="0") {
                alert('Email Message Sent')
          } else {     
            alert('ERROR: Email Message WAS NOT Sent!')
          }
        });
      
      }

    }
  
    notifyBrokerEmail() {

      if (confirm("Are you sure you want to send this invitation using Email?")) {

        this._dataService.postForm("broker-admin-invite", this.data).subscribe((data:any)=>{
          if (data.error_code=="0") {
                location.reload()
          } else {     
            alert('ERROR: Email Message WAS NOT Sent!')
          }
        });
      
      }

    }

    addEmployee () {

    }
    postForm() {
        this._dataService.postForm("post-edit-profile", this.data['formData']).subscribe((data:any)=>{
          if (data.error_code=="0") {
            this._router.navigate(['/sadmin'])
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
              this.file_data=formData
              
            }else{
              alert('File size exceeds 8 MB. Please choose less than 8 MB');
            }
            
        }
    
      }
    
      ip="https://deepgoat.com/data/"
      
      uploadFile()
        {
          console.log(this.file_data);
          this.http.post(this.ip+'upload_org_profile.php',this.file_data)
          .subscribe(res => {
            location.reload()
            console.log(res.toString)
          }, (err) => {
          //send error response
          alert('error occured')
        });
      }

}
