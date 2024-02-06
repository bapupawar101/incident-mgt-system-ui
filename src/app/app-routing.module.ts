import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import DashboardComponent from './dashboard/dashboard.component';
import { IncidentsListComponent } from './pages/Incidents/incidents-list/incidents-list.component';
import { AddIncidentComponent } from './pages/Incidents/add-incident/add-incident.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        title:"Dashboard",
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        title:"Dashboard",
        component: DashboardComponent
      },
      {
        path: 'incidents-list',
        title:"Incident List",
        component: IncidentsListComponent
      },
      {
        path: 'add-incident',
        title: 'Add Incident',
        component: AddIncidentComponent
      },
      {
        path: 'users-list',
        title:"Uusers List",
        component: IncidentsListComponent
      },
      {
        path: 'add-user',
        title: 'Add User',
        component: AddIncidentComponent
      },
      // {
      //   path: 'forms',
      //   loadChildren: () =>
      //     import('./pages/form-elements/form-elements.module').then(
      //       (m) => m.FormElementsModule,
      //     ),
      // },
      // {
      //   path: 'tables',
      //   loadChildren: () =>
      //     import('./pages/tables/tables.module').then(
      //       (m) => m.TablesModule,
      //     ),
      // },
      // {
      //   path: 'apexchart',
      //   loadComponent: () =>
      //     import('./chart/apex-chart/apex-chart.component'),
      // },
      // {
      //   path: 'sample-page',
      //   loadComponent: () =>
      //     import('./extra/sample-page/sample-page.component'),
      // },
    ],
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
