import { GameCardComponent } from './../../components/game-card/game-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameListComponent } from './game-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    GameListComponent,
    GameCardComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    GameListComponent
  ]
})
export class GameListModule { }
