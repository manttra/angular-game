import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Game } from './domain/game.model';
import { GameService } from './services/game.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('info-gameº') el: ElementRef;

  ngOnInit() {
    this.gameService.getServerStatus().subscribe(response => {
      console.log(response)
    if(response !== 200){
      this.canPlay =false;
      this.result = "Something went wrong with the server!"
    }
    else{
      this.canPlay =true;
      this.result = "Start the game!"
      this.gameService.play(0).subscribe(game => this.game = game);
    }
  });
  }

  ngAfterViewInit() {
    this.renderer.setStyle(this.el.nativeElement, 'background', 'yellow');
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', '<p>Hello World<p>');
  }

  game:Game;
  result: string | undefined;
  pointsUser = 0;
  pointsComp =  0;
  canPlay:boolean;

  constructor (private gameService:GameService,  private renderer: Renderer2) {
    this.game = new Game();
   }

  makePlayed(played:number){
    if(this.canPlay){
    this.gameService.play(played).subscribe(game => this.game = game);

    if(this.game.result == "User wins" ){
      this.pointsUser = this.pointsUser + 1;
    }

    if(this.game.result == "User Loses" ){
      this.pointsComp = this.pointsComp + 1;
    }

    this.result = this.game.result;
  }
}
}