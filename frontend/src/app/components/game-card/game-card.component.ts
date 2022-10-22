import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/models/card';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  @Input()
  data!: Card;

  constructor() {}

  ngOnInit(): void {
  }

}
