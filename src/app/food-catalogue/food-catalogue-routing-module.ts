import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodCatalogue } from './components/food-catalogue';

const routes: Routes = [
  { path: 'food-catalogue/:id', component: FoodCatalogue }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodCatalogueRoutingModule { }
