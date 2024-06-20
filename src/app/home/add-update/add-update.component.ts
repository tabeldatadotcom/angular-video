import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../home.service';
import { Account } from 'src/app/model/customer';

@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.scss'],
})
export class AddUpdateComponent implements OnInit {
  formInputCustomer!: FormGroup;
  // formInputOrder!: FormGroup;
  transactionForm!: FormGroup;
  imageFile!: File;
  imageSrc: string =
    'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6.webp';
  type!: string;
  customerName!: number;
  mode: string = '';

  cities: any[] = [];
  listAccount: any[] = [];

  // account!: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: HomeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.customerName = param['name'];
      if (param['name']) {
        this.type = 'order';
        // this.getDetailAccount();
      } else {
        this.type = 'customer';
      }

      // this.getOrderInfo();
      this.getAllCity()
      this.getAllAccounts()
      // this.mode = param['type'];
      // console.log(this.mode);
      // console.log(`customer id : ${param['id']}`);
      // console.log(`customer id : ${this.customerId}`);
    });

    this.formInputCustomer = this.formBuilder.group({
      name: this.formBuilder.control(null),
      address: this.formBuilder.control(null),
      city: this.formBuilder.control(null),
      imageUrl: this.formBuilder.control(null),
    });

    this.transactionForm = this.formBuilder.group({
      fromAccountName: this.formBuilder.control(this.customerName),
      toAccountName: this.formBuilder.control(null),
      amount: this.formBuilder.control(null),
      transactionType: this.formBuilder.control('transfer'),
      timestamp: this.formBuilder.control(new Date()),
      status: this.formBuilder.control('success')
    });

    // this.formInputOrder = this.formBuilder.group({
    //   customerId: this.formBuilder.control(this.customerId),
    //   product: this.formBuilder.control(null),
    //   quantity: this.formBuilder.control(null),
    // });

    // console.log(`customer id -> ${this.customerId} ----> form input => ${this.formInputOrder.get('customerId')?.value}`)
  }

  // getOrderInfo() {
  //   this.service.findByOrderId(this.customerId).subscribe((resp) => {
  //     console.log(resp.body);
  //     this.formInputOrder.patchValue({
  //       customerId: resp.body?.customerId,
  //       product: resp.body?.product,
  //       quantity: resp.body?.quantity,
  //     });
  //   });
  // }

  getAllAccounts(){
    this.service.getList().subscribe((resp) => {
      this.listAccount = resp.body!
      this.changeDetectorRef.detectChanges();
    })
  }

  getAllCity() {
    this.service.getListCity().subscribe((resp) => {
      console.log(resp.body);
      this.cities = resp.body!
      this.changeDetectorRef.detectChanges();
    })
  }

  // getDetailAccount(){
  //   this.service.findByCustomerId(this.customerId).subscribe((resp) => {
  //     this.account = resp.body!
  //   })
  // }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      this.imageFile = file;

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }

  save() {
    if (this.type == 'customer') {
      this.service.saveImage(this.imageFile).subscribe((resp) => {
        if (resp.status == 200 || resp.status == 201) {
          console.log(`berhasil ${resp.body.imageUrl}`);
          this.formInputCustomer.patchValue({
            imageUrl: resp.body.imageUrl,
          });

          this.service.save(this.formInputCustomer.value).subscribe((resp) => {
            if (resp.status == 200 || resp.status == 201) {
              this.router.navigate(['']);
            }
          });
        }
      });
    } else {
      // if (this.mode == 'edit') {
        // this.service.updateOrder(this.customerId, this.formInputOrder.value).subscribe((resp) => {
        //   console.log(resp);

        //   if (resp.status == 200) {
        //     this.router.navigate(['order', this.customerId]);
        //   }
        // });
      // } else {
        // console.log(`================== ${this.formInputOrder.value}`)
        // this.transactionForm.patchValue({
        //   fromAccountName: this.account.name
        // });
        this.service.saveTransaction(this.transactionForm.value).subscribe((resp) => {
          if (resp.status == 201) {
            this.router.navigate(['order', this.customerName]);
          }
        });
      // }
    }
  }
}
