import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApexOptions } from 'ng-apexcharts';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy
{
  navigation: Navigation;
  isScreenSmall: boolean;
  term: any;
  hide: any;
  p: any;
  formFieldHelpers: string[] = [''];
  dsc: any;
  doc_title: any;
  active: any;
  prospects: any;
  commissions: any;
  invoices: any;


    chartGithubIssues: ApexOptions = {};
    chartTaskDistribution: ApexOptions = {};
    chartBudgetDistribution: ApexOptions = {};
    chartWeeklyExpenses: ApexOptions = {};
    chartMonthlyExpenses: ApexOptions = {};
    chartYearlyExpenses: ApexOptions = {};
    data: any;
    docs: any;
    selectedProject: string = 'ACME Corp. Backend App';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
currentYear: any;
email: any;
user: any;
//Upload 
index: any;
uploading: any;
tuploading: any;
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
      public http: HttpClient  // used by upload
  ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
     showUpload() {
      if (this.uploading=='Y') {
        this.uploading='N'
      } else {
        this.uploading='Y'
      }
   }

   showTemplateUpload() {
    if (this.tuploading=='Y') {
      this.tuploading='N'
    } else {
      this.tuploading='Y'
    }
 }

   showDocs() {
    if (this.docs=='Y') {
       this.docs='N';
    } else {
      this.docs='Y'
    }
  }

  showProspects() {
    if (this.prospects=='Y') {
       this.prospects='N';
    } else {
      this.prospects='Y'
    }
  }

  showInvoices() {
    if (this.invoices=='Y') {
       this.invoices='N';
    } else {
      this.invoices='Y'
    }
  }

  showActive() {
    if (this.active=='Y') {
       this.active='N';
    } else {
      this.active='Y'
    }
  }

  showCommissions() {
    if (this.commissions=='Y') {
       this.commissions='N';
    } else {
      this.commissions='Y'
    }
  }

    ngOnInit(): void
    {      
      this.uploading='N';
      this.hide='Y';
      this.docs='N';
      this.active='N';
      this.prospects='N';
      this.commissions='N';
      this.invoices='N';
      this.tuploading='N';
            this._activatedRoute.data.subscribe(({ 
              data, menudata, userdata })=> { 
              this.data=data;
              this.navigation=menudata
              this.user=userdata
              if (this.data.user.force_logout>0) {
                  localStorage.removeItem('uid');
                  this._router.navigate(['/forced-off',this.data.user.force_logout]);
              }
              if (this.data.user.role=="employee") {
                  this._router.navigate(['/dashboard']);
              }
              if (this.data.user.role=="badmin") {
                  this._router.navigate(['/badmin']);
              }
            }) 
            

    this._navigationService.navigation$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((navigation: Navigation) => {
            this.navigation = navigation;
        });

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(({matchingAliases}) => {
            // Check if the screen is small
            this.isScreenSmall = !matchingAliases.includes('md');
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Fix the SVG fill references. This fix must be applied to all ApexCharts
     * charts in order to fix 'black color on gradient fills on certain browsers'
     * issue caused by the '<base>' tag.
     *
     * Fix based on https://gist.github.com/Kamshak/c84cdc175209d1a30f711abd6a81d472
     *
     * @param element
     * @private
     */
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

    signOut(): void
    {
        localStorage.removeItem('uid');
        localStorage.removeItem('role');
        this._router.navigate(['/sign-out']);
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
              //formData.append('company_id',this.data.id);
              formData.append('company_id','0');
              formData.append('user_id',this.data.user.id);
              formData.append('dsc',this.doc_title);
              formData.append('doc_title',this.doc_title);
              this.file_data=formData
              
            }else{
              alert('File size exceeds 8 MB. Please choose less than 8 MB');
            }
            
        }
    
      }
    
      ip="https://myna-docs.com/api/"
    
      getProfile(id: any, status: any) {
        if (status=="Enrolled"||status=="enrolled"||status=="enrolling") {
          window.open(
            "https://myna-docs.com/api/get_quote_template.php?id="+id);
        }  else {
          window.open(
            "https://myna-docs.com/api/get_quote_template.php?id="+id);
        }
      }


      uploadFile() {
        this._dataService.postTemplate(this.file_data).subscribe((data:any)=>{
          if (data.error_code==0) {
              console.log(data)
              window.open(
                "https://myna-docs.com/api/"+data.filename);
          }
        });   
      }

      uploadFile2() {
          console.log(this.file_data);

          /*
          if (this.doc_title=="QUOTING") {
            this.http.post(this.ip+'upload_quoting_template.php',this.file_data)
          .subscribe(res => {
            //location.reload()
            this.uploading='N'
            console.log(res.toString)
          }, (err) => {
          //send error response
          alert('error occured')
        });
        }

        if (this.doc_title=="ENROLLMENT") {
            this.http.post(this.ip+'upload_enrollment_template.php',this.file_data)
          .subscribe(res => {
            //location.reload()
            window.open(
              "https://myna-docs.com/api/"+res.filename);
            this.uploading='N'
            console.log(res.toString)
          }, (err) => {
          //send error response
          alert('error occured')
        });
        }
        */
      }

        showDoc(id: any) {
          window.open('https://myna-docs.com/?id='+id,'_new')
        }

}
