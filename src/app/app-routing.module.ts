import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";

export const routes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search/:game-search',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
