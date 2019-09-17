/*import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {User} from '../_models';
import { AlertService, UserService, AuthenticationService } from '@app/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../_helpers/must-match.validator';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  changePasswordForm: FormGroup;
  loading = false;
  submitted = false;
  user: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
) {
}
ngOnInit() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let id = currentUser.id;
  // getting user credentials
  this.user = this.userService.getById(id)

  this.changePasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  },
  {
      validator: MustMatch('password', 'confirmPassword'),
  });
}

    // convenience getter for easy access to form fields
    get f() { return this.changePasswordForm.controls; }

    onSubmit() {
        this.submitted = true;
        //this.authenticationService.logout();
        // stop here if form is invalid
        if (this.changePasswordForm.invalid) {
            return;
        }

        this.loading = true;
        let editingUsers = JSON.parse(localStorage.getItem('users'))
        this.changePasswordForm.valid 
        localStorage.setItem()
    }
}
*/