import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item } from "../entities/item.entity";
import {ProductService} from "../_services/product.service";

@Component({
	templateUrl: 'index.component.html'
})

export class CartComponent implements OnInit {
	private total: number;
	private items: Item[] = [];
	public myCart;
	constructor(
		private activatedRoute: ActivatedRoute,
		private productService: ProductService,
	) { 	}

	ngOnInit() {
			this.activatedRoute.params.subscribe(params => {
			var id = params['id'];
			this.myCart = JSON.parse(localStorage.getItem('cart'))
			if (id) { 
				var item: Item = { // to save the selected item
					product: this.productService.find(id), // returns the selected product
					quantity: 1
				};
				if (localStorage.getItem('cart') == null) { // if stored cart is empty
					let cart: any = []; // declare 'new' empty cart
					cart.push(JSON.stringify(item)); // add the item to the cart
					localStorage.setItem('cart', JSON.stringify(cart)); // save the 'new' cart

				} else { // if stored cart NOT empty
					let cart: any = JSON.parse(localStorage.getItem('cart')); // save stored cart into new cart array
					let index: number = -1;
					for (var i = 0; i < cart.length; i++) { // going through each item in cart to check if bought item is similar
						let item: Item = JSON.parse(cart[i]);
						if (item.product.id == id) {
							index = i;
							break;
						}
					}
					if (index == -1) { // if never bought such an item
						cart.push(JSON.stringify(item));
						localStorage.setItem('cart', JSON.stringify(cart));
					} else { // if I bought an item twice or more
						let item: Item = JSON.parse(cart[index]);
						item.quantity += 1;
						cart[index] = JSON.stringify(item);
						localStorage.setItem("cart", JSON.stringify(cart));
					}
				}
				
				this.loadcart();
			} else {
				this.loadcart();
			}
		});
		

	}
	

	loadcart(): void { // reload the cart each time I add an item
		this.myCart = JSON.parse(localStorage.getItem('cart'))

		this.total = 0;
		this.items = [];
		let cart = JSON.parse(localStorage.getItem('cart'));
		for (var i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			this.items.push({
				product: item.product,
				quantity: item.quantity
			});
			this.total += item.product.price * item.quantity;
		}
		
	}

	remove(id: string): void { // to remove an item from the cart
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		let index: number = -1;
		for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item.product.id == id) {
				cart.splice(i, 1);
				break;
			}
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadcart();
	}

}
