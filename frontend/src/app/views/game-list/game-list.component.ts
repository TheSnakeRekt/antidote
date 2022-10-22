import { GamelistService } from './../../services/gamelist.service';
import { AfterViewChecked, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subject, takeUntil, tap } from 'rxjs';
import { Card } from 'src/models/card';
import { mapGames } from './game-list.helper';
import { SearchParams } from 'src/models/search_params';
@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit, OnDestroy, AfterViewChecked {

  page :any;
  gameList: BehaviorSubject<any>= new BehaviorSubject<Card[]>([]);
  searchQuery = new Subject<string>();
  unsubscriber$ = new Subject<void>();

  breakpoint = false;

  title: string = '';
  totalItems!: number;

  defaultParams:SearchParams = {
    page : 1,
    page_size: (this.breakpoint ? 4: 12),
    search: ''
  }

  constructor(private gamelistService: GamelistService) {

    this.breakpoint = window.screen.width <= 759;
    if(this.breakpoint){
      this.defaultParams = {
        page : 1,
        page_size: 4,
        search: ''
      }
    }

    this.gamelistService.getGames(this.defaultParams).pipe(
      tap((games:any)=>{
        this.totalItems = games.count
        this.gameList.next(mapGames(games))
      }),
      takeUntil(this.unsubscriber$)
    ).subscribe();

    this.searchQuery.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      takeUntil(this.unsubscriber$))
    .subscribe(value =>{
      this.searchByTitle(value);
    });

  }

  ngAfterViewChecked(): void {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.breakpoint = window.screen.width <= 759;
    if(this.breakpoint) {
      this.defaultParams = {
        page : 1,
        page_size: 4,
        search: ''
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
  }

  ngOnInit(): void {

  }

  changePage(event: any){
    this.page = event;
    this.gamelistService.getGames({search:this.title, search_precise:true, page:event, page_size:(this.breakpoint? 4: 12)}).pipe(
      tap((games:any)=>{
        this.totalItems = games.count
        this.gameList.next(mapGames(games))
      }),
      takeUntil(this.unsubscriber$)
    ).subscribe();
  }

  searchByTitle(title: string = ''){
    this.gamelistService.getGamesByTitle({
      search:title, search_precise:true, page:this.page, page_size:(this.breakpoint? 4: 12)
    }).pipe(tap((games:any)=>{
        this.totalItems = games.count;
        this.title = title;
        this.gameList.next(mapGames(games))
      }),
      takeUntil(this.unsubscriber$)
    ).subscribe();
  }

  onKeyUp(event:any){
    this.title = event.target.value;
    this.searchQuery.next(this.title);
  }
}
