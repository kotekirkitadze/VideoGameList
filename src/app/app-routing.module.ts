import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { DetailsComponent } from "./components/details/details.component";
import { HomeComponent } from "./components/home/home.component";

export const routes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search/:game-search',
    component: HomeComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
