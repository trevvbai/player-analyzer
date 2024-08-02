import {Component, OnInit} from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import {SupabaseService} from "./supabase.service";
import {AccountComponent} from "./account/account.component";
import {AuthComponent} from "./auth/auth.component";
import {CommonModule} from "@angular/common";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {environment} from "../../environment";
import {Environment} from "@angular/cli/lib/config/workspace-schema";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterModule, AccountComponent, AuthComponent, CommonModule, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'player analyzer wizard'
  readonly supabaseService: SupabaseService = new SupabaseService()

  session = this.supabaseService.getSession

  ngOnInit() {
    this.supabaseService.authChanges((_, session) => (this.session = session))
  }

    protected readonly environment = environment;
  protected readonly Environment = Environment;
}
