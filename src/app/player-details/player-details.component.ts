import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router, RouterModule} from "@angular/router";
import {Player, SupabaseService} from "../supabase.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";

@Component({
  selector: 'app-player-details',
  standalone: true,
  imports: [RouterModule, MatGridList, MatGridTile, MatCard, MatCardHeader, MatCardImage, MatCardContent, MatCardTitle, MatCardSubtitle],
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.scss'
})
export class PlayerDetailsComponent implements OnInit{

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];


  row:any;
  player: Player | null = null;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private supabaseService : SupabaseService) {
  }

  async ngOnInit() {
    const playerId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.player = await this.supabaseService.getIndividualPlayer(playerId);
  }

  navigateHome() {
    this.router.navigate([""])
  }
}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
