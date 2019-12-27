import { Injectable } from '@angular/core';
import { HEROES } from '../../../../mock-data';
import { BASE_API_URL } from '../../constants';
import { Hero } from '../../models/hero';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient) {
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(BASE_API_URL);
  }

  getHero(heroId: string): Observable<Hero> {
    return this.http.get<Hero>(BASE_API_URL + heroId);
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(BASE_API_URL, hero, httpOptions)
      .pipe(
        catchError(e => this.handleError(e))
      );
  }

  updateHero(editedHero: Hero): Observable<Hero> {
    return this.http.put<Hero>(BASE_API_URL + editedHero._id, editedHero);
  }

  deleteHero(heroId: string): Observable<{}> {
    return this.http.delete<Hero>(BASE_API_URL + heroId, httpOptions);
  }

  validateHero(hero: Hero): boolean {
    if (!hero.name || !hero.imageUrl || !hero.superPower) {
      return false;
    } else {
      return true;
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  getMockHeroes(): Hero[] {
    return HEROES;
  }

}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

