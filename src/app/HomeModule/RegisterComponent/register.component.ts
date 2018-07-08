import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../_services/authentication.service";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { STATES } from "./states";

@Component({
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
  states: any[] = STATES;
  terms: boolean = false;

  loading: boolean = false;
  errorMessage: string = '';

  userForm: FormGroup;
  full_name: FormControl;
  email: FormControl;
  address: FormControl;
  city: FormControl;
  phone_number: FormControl;
  password: FormControl;
  state: FormControl;
  postal_code: FormControl;

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.full_name = this.fb.control('', Validators.required);
    this.email = this.fb.control('', Validators.required);
    this.address = this.fb.control('');
    this.city = this.fb.control('', Validators.required);
    this.phone_number = this.fb.control('');
    this.password = this.fb.control('', Validators.required);
    this.state = this.fb.control('Aguascalientes', Validators.required);
    this.postal_code = this.fb.control('', Validators.required);

    this.userForm = this.fb.group({
      full_name: this.full_name,
      email: this.email,
      address: this.address,
      state: this.state,
      city: this.city,
      postal_code: this.postal_code,
      phone_number: this.phone_number,
      password: this.password
    });
  }

  register() {
    this.errorMessage = '';
    this.loading = true;
    this.authenticationService.register(this.userForm.value).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.loading = false;
        error = JSON.parse(error._body);
        if (error.error === 'User alredy exist') {
          this.errorMessage = 'Ya existe una cuenta asociada a este email.';
        } else {
          this.errorMessage = 'Parece que ha habido un error, por favor intentalo más tarde.';
        }
      }
    )
  }
}
