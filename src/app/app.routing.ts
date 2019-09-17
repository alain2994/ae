import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DetailsComponent } from './prod_details/details.component';
import { OrdersComponent } from './orders/orders.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const appRoutes: Routes = [
    { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'products', component: ProductComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent},
    { path: 'details', component: DetailsComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'wishlist', component: WishlistComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: 'dashboard' }
];

export const routing = RouterModule.forRoot(appRoutes);