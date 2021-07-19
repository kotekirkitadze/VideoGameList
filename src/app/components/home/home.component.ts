import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { APIResponse, Game } from '../../model'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort: string;
  public games: Array<Game>

  private _subGames: Subscription;
  private _subroute: Subscription;

  constructor(private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this._subroute = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    })
  }


  searchGames(sort: string, search?: string): void {
    this._subGames = this.httpService.getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      })
  }

  openGameDetails(id) {
    this.router.navigate(['details', id])
  }

  ngOnDestroy() {
    if (this._subGames) {
      this._subGames.unsubscribe();
    }
    if (this._subroute) {
      this._subroute.unsubscribe();
    }
  }
}
