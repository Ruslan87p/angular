import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  data = [];

  constructor(private http: HttpClient) { }

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
