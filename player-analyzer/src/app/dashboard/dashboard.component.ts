import {AfterViewInit, Component, OnInit, ViewChild, viewChild} from '@angular/core';
import {PlayerListRes, SupabaseService} from "../supabase.service";
import {Player} from "../supabase.service";
import {CommonModule, NgForOf} from "@angular/common";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {TableModule} from "primeng/table";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    CommonModule,
    TableModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit{
  playerList!: Player[]
  displayedColumns: string[] = ['espn_headshot','long_name', 'position']; // Define your columns here
  dataSource = new MatTableDataSource<Player>(this.playerList)
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private supabaseService: SupabaseService,
  ) {
  }

  async ngOnInit() {
    this.playerList = await this.supabaseService.getOffensivePlayers();
    this.dataSource.data = this.playerList;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort;
  }
}
