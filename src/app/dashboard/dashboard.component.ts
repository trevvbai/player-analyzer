import {AfterViewInit, Component, OnInit, QueryList, ViewChild, viewChild, ViewChildren} from '@angular/core';
import {PlayerListRes, SupabaseService} from "../supabase.service";
import {Player} from "../supabase.service";
import {CommonModule, NgForOf} from "@angular/common";
import {TableModule} from "primeng/table";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {Router, RouterLink, RouterModule} from "@angular/router";
import {AuthComponent} from "../auth/auth.component";
import {Session} from "@supabase/supabase-js";
import {MatAutocomplete} from "@angular/material/autocomplete";
import {MatLabel} from "@angular/material/form-field";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    CommonModule,
    TableModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RouterLink,
    RouterModule,
    AuthComponent,
    MatAutocomplete,
    MatLabel,
    MatGridList,
    MatGridTile,
    MatCardModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit{
  playerList!: Player[]
  rbList: Player[] = [];
  displayedColumns: string[] = ['espn_headshot','long_name']; // Define your columns here
  dataSource = new MatTableDataSource<Player>(this.playerList)
  rbDataSource = new MatTableDataSource<Player>();
  wrDataSource = new MatTableDataSource<Player>();
  qbDataSource = new MatTableDataSource<Player>();
  teDataSource = new MatTableDataSource<Player>();
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>()
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  session!: Session | null
  // @ViewChild(MatPaginator) paginator!: MatPaginator
  // @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private supabaseService: SupabaseService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.supabaseService.authChanges((_, session) => (this.session = session))
    this.session = this.supabaseService.getSession;

  }
  async ngAfterViewInit() {
    this.playerList = await this.supabaseService.getOffensivePlayers();
    this.rbDataSource.data = this.playerList.filter(x => x.position == "RB");
    this.wrDataSource.data = this.playerList.filter(x => x.position == "WR");
    this.qbDataSource.data = this.playerList.filter(x => x.position == "QB");
    this.teDataSource.data = this.playerList.filter(x => x.position == "TE");
    this.rbDataSource.paginator = this.paginator.toArray()[0];
    this.wrDataSource.paginator = this.paginator.toArray()[1];
    this.qbDataSource.paginator = this.paginator.toArray()[2];
    this.teDataSource.paginator = this.paginator.toArray()[3];
    this.rbDataSource.sort = this.sort.toArray()[0];
    this.wrDataSource.sort = this.sort.toArray()[1];
    this.qbDataSource.sort = this.sort.toArray()[2];
    this.teDataSource.sort = this.sort.toArray()[3];
  }

  navigateToPlayerDetails(row: Player) {
    this.router.navigate(['/player-details', row.id]);


  }
}
