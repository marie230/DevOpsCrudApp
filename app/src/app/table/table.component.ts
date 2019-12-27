import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroService } from '../shared/services/hero-service/hero.service';
import { Hero } from '../shared/models/hero';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { AddDialogComponent } from '../dialogs/add-dialog/add-dialog.component';
import { EditDialogComponent } from '../dialogs/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  dataSource = new MatTableDataSource<Hero>([]);
  displayedColumns: string[] = ['imageUrl', 'name', 'superPower', 'description', 'actions'];

  heroes: Hero[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private heroService: HeroService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getHeroes();
    this.dataSource.paginator = this.paginator;
  }

  get isListEmpty(): boolean {
    return this.dataSource ? this.dataSource.data.length > 0 : false;
  }

  private getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
        this.heroes = heroes;
        this.dataSource.data = heroes;
      }
    );
  }

  addItem(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {},
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((heroToAdd: Hero) => {
      if (heroToAdd) {
        if (this.heroService.validateHero(heroToAdd)) {
          this.heroService.addHero(heroToAdd).subscribe((addedHero: Hero) => {
            this.dataSource.data = this.dataSource.data.concat(addedHero);
          });
        }
      }
    });
  }

  editItem(hero: Hero) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: hero,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((heroToUpdate: Hero) => {
      if (heroToUpdate) {
        if (this.heroService.validateHero(heroToUpdate)) {
          this.heroService.updateHero(heroToUpdate).subscribe((updatedHero: Hero) => {
            const index = this.dataSource.data.indexOf(heroToUpdate);
            this.dataSource.data.splice(index, 1, updatedHero);
          });
        }
      }
    });
  }

  deleteHero(hero: Hero) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: hero,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((heroToDelete: Hero) => {
        if (heroToDelete) {
          if (this.heroService.validateHero(heroToDelete)) {
            this.heroService.deleteHero(heroToDelete._id).subscribe((deletedHero: Hero) => {
              this.dataSource.data = this.dataSource.data.filter(value => value._id !== deletedHero._id);
            });
          }
        }
      }
    );
  }

}
