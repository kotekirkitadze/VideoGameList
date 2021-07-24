import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGameList(ordering: string, search?: string): Observable<APIResponse<Game>> {

    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, { params: params })

  }


  getGameDetails(id: string): Observable<any> {
    const gameInfoReq = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailerReq = this.http.get(`${env.BASE_URL}/games/${id}/movies`);
    const gameScreenshotsReq = this.http.get(`${env.BASE_URL}/games/${id}/screenshots`);

    return forkJoin({
      gameInfoReq,
      gameTrailerReq,
      gameScreenshotsReq
    }).pipe(map((resp: any) => {
      return {
        ...resp,
        screenshots: resp['gameScreenshotsReq']?.results,
        trailers: resp['gameTrailerReq']?.results,
      };
    }))

 

  }
}
