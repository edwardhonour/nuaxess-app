import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

//--
//-- This is a single resolver application that calls a single API with a parameter that tells the 
//-- API what data to return.
//--
@Injectable({
  providedIn: 'root'              
})
export class DataResolver implements Resolve<boolean> {

  r: any;
  path: any;
  id: any;
  id2: any;
  id3: any;

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      //--
      //-- In order to use a single resolver and data service for all queries we manually 
      //-- parse the url and pass the path and parameters to the data service.
      //--
      this.path = '';
      this.id='';
      this.id2='';
      this.id3='';
      console.log(route)
      console.log(state)
      

      if (state.url!==undefined) {
        this.path = state.url;
      }

     
    this.r=this.dataService.getData(this.path, this.id, this.id2, this.id3).pipe(catchError(err=> 
      { 
        console.log(err);
        return of(null);
      }));
      console.log(this.r);
    return (this.r)
  }
}

@Injectable({
  providedIn: 'root'
})
export class MenuResolver implements Resolve<boolean> {

  r: any;

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
     
    this.r=this.dataService.getVerticalMenu().pipe(catchError(err=> 
      { 
        console.log(err);
        return of(null);
      }));
      console.log(this.r);
    return (this.r)
  }
}


@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<boolean> {

  r: any;

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
     
    this.r=this.dataService.getUser().pipe(catchError(err=> 
      { 
        console.log(err);
        return of(null);
      }));
      console.log(this.r);
    return (this.r)
  }
}


@Injectable({
  providedIn: 'root'
})
export class EnrollResolver implements Resolve<boolean> {

  r: any;
  path: any;
  id: any;
  id2: any;
  id3: any;

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
     
    this.path = '';
    this.id='';
    this.id2='';
    this.id3='';    

    if (state.url!==undefined) {
      this.path = state.url;
    }

    this.r=this.dataService.getEnroll(this.path).pipe(catchError(err=> 
      { 
        console.log(err);
        return of(null);
      }));
      console.log(this.r);
    return (this.r)
  }
}