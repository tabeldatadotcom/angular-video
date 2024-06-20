import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../home.service';
import { Transaction } from 'src/app/model/order';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss'],
})
export class ListOrderComponent implements OnInit {
  listTransaction: Transaction[] = [];
  customerId!: number;
  customerName!: string;

  constructor(
    private service: HomeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      this.customerName = params['name'];
    });

    // this.getCustomerInfo();
    this.getListTransaction();
  }

  // getCustomerInfo() {
  //   this.service.findByCustomerId(this.customerId).subscribe((resp) => {
  //     console.log(resp.body);
  //     // this.customerName = resp.body!.firstName;
  //   });
  // }

  getListTransaction() {
    this.service.getListTransactionByAccountName(this.customerName).subscribe((resp) => {
      console.log(resp);
      this.listTransaction = resp.body!;
    });
  }

  // editOrder(id: any) {
  //   this.service.findByOrderId(id).subscribe((resp) => {
  //     console.log('hasil');
  //   });
  // }

  // deleteOrder(id: any) {
  //   this.service.deleteOrder(id).subscribe((resp) => {
  //     this.getCustomerInfo();
  //     this.getListOrder();
  //   });
  // }
}
