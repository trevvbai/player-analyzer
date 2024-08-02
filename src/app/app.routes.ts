import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import {DashboardComponent} from "./dashboard/dashboard.component";


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
      path: 'details/:id',
      component: DetailsComponent,
      title: 'Home details',
    },
  ];

  export default routes;
