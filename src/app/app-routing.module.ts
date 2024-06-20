import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUpdateComponent } from './home/add-update/add-update.component';
import { ListOrderComponent } from './home/list-order/list-order.component';
import { ListComponent } from './home/list/list.component';

const routes: Routes = [
  {
    path: "",
    component: ListComponent
  },
  {
    path: "add/customer",
    component: AddUpdateComponent
  },
  {
    path: "add/order/:id/:type",
    component: AddUpdateComponent
  },
  {
    path: "add/order/:name",
    component: AddUpdateComponent
  },
  {
    path: "order/:name",
    component: ListOrderComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
