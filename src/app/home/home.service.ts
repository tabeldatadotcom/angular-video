import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account, SaveAccount } from '../model/customer';
import { SaveTransaction, Transaction } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  // customer service

  findByCustomerId(id: number){
    return this.http.get<Account>(`${environment.api}/api/account/v1${id}`, {observe: "response"})
  }

  getList(): Observable<HttpResponse<Account[]>>{
    return this.http.get<Account[]>(`${environment.api}/api/account/v1/list`, {observe: "response"})
  }

  save(data : SaveAccount){
    return this.http.post<any>(`${environment.api}/api/account/v1/create`, data, {observe: "response"})
  }

  saveImage(file: File){
    const data : FormData = new FormData();
    data.append('file', file);

    return this.http.post<any>(`${environment.api}/api/minio/v1/save`, data, {observe: "response"})
  }

  // region

  getListCity(){
    return this.http.get<any[]>(`${environment.apiReg}/api-reg/city/v1/list`, {observe: "response"})
  }

  // transaction service

  getListTransactionByAccountName(name: any){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("accountName", name)
    return this.http.get<Transaction[]>(`${environment.apiTrx}/api-trx/transaction/v1`, {params: queryParams, observe: "response"})
  }

  saveTransaction(data: SaveTransaction){
    return this.http.post<any>(`${environment.apiTrx}/api-trx/transaction/v1/save`, data, {observe: "response"})
  }

  // order service

  // getListOrderByCustomer(customerId: number){
  //   return this.http.get<Order[]>(`${environment.api}/api/order/list/${customerId}`, {observe: "response"})
  // }

  // saveOrder(data: SaveOrder){
  //   return this.http.post<any>(`${environment.api}/api/order/save`, data, {observe: "response"})
  // }

  // updateOrder(id: number, data: SaveOrder){
  //   return this.http.put<any>(`${environment.api}/api/order/update/${id}`, data, {observe: "response"})
  // }

  // findByOrderId(id: number){
  //   return this.http.get<Order>(`${environment.api}/api/order/${id}`, {observe: "response"})
  // }

  // deleteOrder(id: number){
  //   return this.http.delete<Order>(`${environment.api}/api/order/${id}`)
  // }
}
