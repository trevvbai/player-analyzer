import {AfterViewInit, Component, OnInit, Renderer2, SimpleChange} from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import {SupabaseService} from "./supabase.service";
import {AccountComponent} from "./account/account.component";
import {AuthComponent} from "./auth/auth.component";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {DashboardComponent} from "./dashboard/dashboard.component";
import { environment } from '../environments/environment';
import SimpleBar from "simplebar";
import {OverlayScrollbars} from "overlayscrollbars";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterModule, AccountComponent, AuthComponent, CommonModule, DashboardComponent, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'player analyzer wizard'
  readonly supabaseService: SupabaseService = new SupabaseService()

  session = this.supabaseService.getSession

	constructor(readonly renderer: Renderer2) {
	}

  ngOnInit() {
    this.supabaseService.authChanges((_, session) => (this.session = session))
		const foobar = OverlayScrollbars(document.body, {});

	}

	ngAfterViewInit() {
		// let body = document.body
		// this.renderer.addClass(body, 'simplebar')
		// new SimpleBar(body);
	}
}
