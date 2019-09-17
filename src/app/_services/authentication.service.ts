import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private router: Router;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        let cartData: any = JSON.parse(localStorage.getItem('cartData'));
        let cart: any = JSON.parse(localStorage.getItem('cart'));
        let wishlistData: any = JSON.parse(localStorage.getItem('wishlistData'));
        let wishlist: any = JSON.parse(localStorage.getItem('wishlist'));
        let orderlistData: any = JSON.parse(localStorage.getItem('orderlistData'));
        let orderlist: any =  JSON.parse(localStorage.getItem('orderlist'));
        let orderDateData: any = JSON.parse(localStorage.getItem('orderDateData'));
        let orderDate: any = JSON.parse(localStorage.getItem('orderDate'));
        // to update both the cartData and the wishlistData
        let index = this.currentUserValue.id
        cartData.splice(index-1, 1, cart)
        wishlistData.splice(index-1, 1, wishlist)
        orderlistData.splice(index-1, 1, orderlist)
        orderDateData.splice(index-1, 1, orderDate)

        localStorage.setItem("cartData", JSON.stringify(cartData));
        localStorage.setItem("wishlistData", JSON.stringify(wishlistData));
        localStorage.setItem("orderlistData", JSON.stringify(orderlistData));
        localStorage.setItem('orderDateData', JSON.stringify(orderDateData))
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);

    }
}