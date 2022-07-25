import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';

import { Game } from "../domain/game.model";
import { Observable } from 'rxjs';

@Injectable()
export class GameService{

    constructor(private http: HttpClient) {
    }

    play(elementId : number) : Observable<Game> {
        return this.http.get<Game>('/api/v1/play?elementId=' + elementId)
        .pipe(map(res => res));
    }

    getServerStatus() : Observable<any> {
        return this.http.get('/api/v1/health', {responseType:'text', observe: 'response'}).pipe(map(data => {
            console.log("Here will be return response code Ex :200", data.status)
            return data.status
              }));
    }
}