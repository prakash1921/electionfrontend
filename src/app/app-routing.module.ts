import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { AppComponent } from './app.component';


const routes: Routes = [
   {
    path: ' ',
    component: AppComponent,
    data: {
      title: 'App Page'
    },
  },
  {
    path: 'chart',
    component: ChartComponent,
    data: {
      title: 'chart Page'
    }
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
