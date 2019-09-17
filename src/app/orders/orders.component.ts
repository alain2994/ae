import { Component, OnInit } from '@angular/core';

import { Item } from ".././entities/item.entity";
import {ProductService} from ".././_services/product.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
 private items: Item[] = [];
 public orders: Order[] = [];
 //private total: number;
 private currentUser: any = JSON.parse(localStorage.getItem('currentUser'))
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.loadOrder()
  }

loadOrder() {
        this.orders = [];
        let orderlist : any = JSON.parse(localStorage.getItem('orderlist'))
        let orderDate : any = JSON.parse(localStorage.getItem('orderDate'))
        if (orderlist.length)
        {
          for (var i = 0; i < orderlist.length; i++) {
            this.items= [];
            let total= 0;
            let order = JSON.parse(orderlist[i]);
            for (var j = 0; j < order.length; j++) {
              let item = JSON.parse(order[j]) 
              total += item.product.price * item.quantity;
              this.items.push({
                product: item.product,
                quantity: item.quantity
              });
            }
           let myDate = orderDate[i]
            this.orders.push({
              cart: this.items,
              date: myDate,
              cost: total
            });
          }
        }
}

}

export class Order {
  cart: Item[];
  date: Date; 
  cost: number;
}