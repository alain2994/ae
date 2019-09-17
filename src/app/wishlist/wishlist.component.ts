import { Component, OnInit } from '@angular/core';
import { Item } from '@app/entities/item.entity';
import { ActivatedRoute } from '@angular/router';
import { ProductService} from '@app/_services';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  private items: Item[] = [];
public myWishlist;
  constructor(
		private activatedRoute: ActivatedRoute,
		private productService: ProductService,

	) { 	}

	ngOnInit() {
			this.activatedRoute.params.subscribe(params => {
			var id = params['id'];
			this.myWishlist = JSON.parse(localStorage.getItem('wishlist'))
			if (id) { 
				var item: Item = { // to save the selected item
					product: this.productService.find(id), // returns the selected product
					quantity: 1
				};
				if (localStorage.getItem('wishlist') == null) { // if stored wishlist is empty
					let wishlist: any = []; // declare 'new' empty wishlist
					wishlist.push(JSON.stringify(item)); // add the item to the wishlist
					localStorage.setItem('wishlist', JSON.stringify(wishlist)); // save the 'new' wishlist
				} else { // if stored wishlist NOT empty
					let wishlist: any = JSON.parse(localStorage.getItem('wishlist')); // save stored wishlist into new wishlist
					let index: number = -1;
					for (var i = 0; i < wishlist.length; i++) { // going through each item in wishlist to check if bought item is similar
						let item: Item = JSON.parse(wishlist[i]);
						if (item.product.id == id) {
							index = i;
							break;
						}
					}
					if (index == -1) { // if never bought such an item
						wishlist.push(JSON.stringify(item));
						localStorage.setItem('wishlist', JSON.stringify(wishlist));
					} else { // if I bought an item twice or more
						let item: Item = JSON.parse(wishlist[index]);
						item.quantity += 1;
						wishlist[index] = JSON.stringify(item);
						localStorage.setItem("wishlist", JSON.stringify(wishlist));
					}
				}
				
				this.loadWishlist();
			} else {
				this.loadWishlist();
			}
		});
		
	}

	loadWishlist(): void { // reload the wishlist each time I add an item
		this.items = [];
		let wishlist = JSON.parse(localStorage.getItem('wishlist'));
		for (var i = 0; i < wishlist.length; i++) {
			let item = JSON.parse(wishlist[i]);
			this.items.push({
				product: item.product,
				quantity: item.quantity
			});
		}
		//localStorage.setItem("wishlist", JSON.stringify(wishlist));
	}

	remove(id: string): void { // to remove an item from the wishlist
		let wishlist: any = JSON.parse(localStorage.getItem('wishlist'));
		let index: number = -1;
		for (var i = 0; i < wishlist.length; i++) {
			let item: Item = JSON.parse(wishlist[i]);
			if (item.product.id == id) {
				wishlist.splice(i, 1);
				break;
			}
		}
		localStorage.setItem("wishlist", JSON.stringify(wishlist));
		this.loadWishlist();
	}

}
