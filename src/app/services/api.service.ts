import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToggleService } from './toggle.service';
import * as moment from 'moment'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  data = [];

  constructor(private http: HttpClient, private toggleSvc: ToggleService) { }

  getData(): Observable<any> {
    return this.http.get<any[]>(`http://localhost:3000/results`).pipe(
      map((dict) => {
        return dict;
      }),
      catchError(this.errorHandler)
    );
  }


  getItemById(id): Observable<any> {
    return this.http.get(`http://localhost:3000/results/`)
      .pipe(map((items) => {
        let values = Object.values(items);
        return values.filter( (item) => item.imdbID === id)
      }),
      catchError(this.errorHandler)
    );
  }


  sortData(items) {
    return this.toggleSvc.isAscDescSortItems.subscribe((state) => {
      items
        .sort((ItemPos2: any, ItemPos1: any) => {
          let pos1: any = moment(ItemPos1.Year, "YYYY/MM/DD");
          pos1.format('YYYY/MM/DD');
          let pos2: any = moment(ItemPos2.Year, "YYYY/MM/DD");
          pos2.format('YYYY/MM/DD');
            if (state) {
              return pos1 - pos2;
          } else {
              return pos2 - pos1;
          }
      })
      .map( item => {
        let date = moment(item.Year, "YYYY/MM/DD").format('YYYY/MM/DD');
        item.Year = date;
        return item;
      })
    }); 
  }
  

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
      console.log(errorMessage);
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
