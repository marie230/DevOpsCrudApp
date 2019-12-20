import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroService } from '../shared/hero.service';
import { Hero } from '../shared/models/hero';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { filter, mergeMap, tap } from 'rxjs/operators';
import { concat, of } from 'rxjs';
import { AddDialogComponent } from '../dialogs/add-dialog/add-dialog.component';
import { EditDialogComponent } from '../dialogs/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['imageUrl', 'name', 'superPower', 'description', 'actions'];
  dataSource = new MatTableDataSource<Hero>();
  heroes: Hero[];
  id: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private heroService: HeroService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource.data = this.getHeroes();
    this.dataSource.paginator = this.paginator;
  }

  get isListEmpty(): boolean {
    return this.dataSource ? this.dataSource.data.length > 0 : false;
  }

  getHeroes(): Hero[] {
    this.heroes = this.heroService.getHeroes();
    return this.heroes;
  }

  // TODO
  addItem() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {hero: Hero},
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.heroService.dataChange.value.push(this.heroService.getDialogData());
        this.refreshTable();
      }
    });
  }

  // TODO
  editItem(hero: Hero) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: hero,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.heroService.dataChange.value.push(this.heroService.getDialogData());
        this.refreshTable();
      }
    });
  }

  // TODO
  deleteHero(hero: Hero) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: hero,
      width: '400px'
    });

    // dialogRef.afterClosed().pipe(
    //   filter(reaction => reaction != null),
    //   mergeMap(() => concat(this.heroService.deleteHero(hero.id)(hero), of(hero))),
    //   tap(deletedUser => {
    //     if (this.dataSource !== null) {
    //       this.dataSource.data = this.dataSource.data.filter(value => value !== deletedUser);
    //     }
    //   })
    // );

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const foundIndex = this.heroService.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.heroService.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}
