import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../_services/authentication.service";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { subscribeOn } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  userForm: FormGroup;
  email: FormControl;
  password: FormControl;

  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.email = this.fb.control('', Validators.email);
    this.password = this.fb.control('', Validators.required);

    this.userForm = this.fb.group({
      email: this.email,
      password: this.password
    });
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.userForm.value).subscribe(
      response => {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.loading = false;
      }
    );
  }
}
