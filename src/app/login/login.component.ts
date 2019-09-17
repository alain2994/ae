import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '@app/_services';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        
        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                    let cartData: any = JSON.parse(localStorage.getItem('cartData'));
                    let wishlistData: any = JSON.parse(localStorage.getItem('wishlistData'));
                    let orderlistData: any = JSON.parse(localStorage.getItem('orderlistData'))
                    let orderDateData: any = JSON.parse(localStorage.getItem('orderDateData'))
                    let index = this.authenticationService.currentUserValue.id
                    // unload if user's cart is not empty otherwise do nothing            
                    localStorage.setItem('cart', JSON.stringify(cartData[index-1]))
                    localStorage.setItem('wishlist', JSON.stringify(wishlistData[index-1]))
                    localStorage.setItem('orderlist', JSON.stringify(orderlistData[index-1]))
                    localStorage.setItem('orderDate', JSON.stringify(orderDateData[index-1]))

                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
