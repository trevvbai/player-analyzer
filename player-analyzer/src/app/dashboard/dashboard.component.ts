import {Component, OnInit} from '@angular/core';
import {SupabaseService} from "../supabase.service";
import {Player} from "../supabase.service";
import {CommonModule, NgForOf} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  foobar: Player[]

  constructor(
    private supabaseService: SupabaseService
  ) {
    this.foobar = []
  }


  async ngOnInit() {
    var foo =await this.supabaseService.getTableData("foobar");
    console.log(foo)
    this.foobar = foo
  }
}
