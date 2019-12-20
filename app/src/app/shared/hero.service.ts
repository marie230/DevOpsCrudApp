import { Injectable } from '@angular/core';
import { HEROES } from '../../mock-data';
import { Hero } from './models/hero';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private httpClient: HttpClient) {
  }

  dataChange: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  dialogData: any;

  getDialogData() {
    return this.dialogData;
  }

  getHeroes(): Hero[] {
    return HEROES;
  }

  deleteHero(heroId: string) {
    console.log('successfully deleted');
    console.log(heroId);
  }
}
