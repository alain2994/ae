import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '@app/entities/item.entity';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
public total: number = 0;
public items: Item[] = [];
public checkoutForm: FormGroup;
private cart: any;
submitted = false;

	constructor(
    private formBuilder: FormBuilder,
    private router: Router
	) { }
  
  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      cardNumber: ['', Validators.required],
      code: ['', Validators.required]
    })
      this.total = 0;
      this.items = [];
      this.cart = JSON.parse(localStorage.getItem('cart'));
      for (var i = 0; i < this.cart.length; i++) {
        let item = JSON.parse(this.cart[i]);
        this.items.push({
          product: item.product,
          quantity: item.quantity
        });
        this.total += item.product.price * item.quantity;
        
    }
  }
  
    // convenience getter for easy access to form fields
    get f() { return this.checkoutForm.controls; }  
    
    submitOrder() {
    this.submitted = true;

     // stop here if form is invalid
     if (this.checkoutForm.invalid) {
      return;
  }
    let order: any = localStorage.getItem('cart');
    let orderlist: any = JSON.parse(localStorage.getItem('orderlist'))
    orderlist.push(order); // add the order to the orderlist

    let orderDate: any = JSON.parse(localStorage.getItem('orderDate'))
    let myDate = new Date()
    orderDate.push(myDate);
    
    localStorage.setItem('orderDate', JSON.stringify(orderDate));
    localStorage.setItem('orderlist', JSON.stringify(orderlist)); // save the 'new' orderlist
    let emptyCart = [];
    localStorage.setItem('cart', JSON.stringify(emptyCart))
    this.router.navigate(['/orders']);

  }
}

