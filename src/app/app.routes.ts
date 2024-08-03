import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PlayerDetailsComponent} from "./player-details/player-details.component";


const routes: Routes = [
    {
      path: '',
      component: DashboardComponent,
      title: 'Dashboard'
    },
    // {
    //   path: '',
    //   component: HomeComponent,
    //   title: 'Home page',
    // },
    {
      path: 'player-details/:id',
      component: PlayerDetailsComponent,
      title: 'Player Details',
    },
  ];

  export default routes;
