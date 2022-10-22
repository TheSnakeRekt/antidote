import { environment } from './../../../environments/environment';
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
    GameCardComponent,
    GameListComponent
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
  ],
  providers:[
    {provide:'BASE_URL', useValue:environment.apiUrl}
  ]
})
export class GameListModule { }
