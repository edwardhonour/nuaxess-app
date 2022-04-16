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
import { NgLocalization } from '@angular/common';

@Component({
  selector: 'app-forced-logout',
  templateUrl: './forced-logout.component.html',
  styleUrls: ['./forced-logout.component.scss']
})
export class ForcedLogoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  redirect() {
    location.replace("https://mynuaxess.com/#/sign-in")
  }

}
