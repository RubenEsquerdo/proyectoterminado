import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order: 'String'[] = [];

  constructor() { }

  addproduct(product){
    this.order.push(product);
  }


}
