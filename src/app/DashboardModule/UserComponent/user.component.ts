import { Component, OnInit } from "@angular/core";
import { STATES } from "../../HomeModule/RegisterComponent/states";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

@Component({
  templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {
  states: any[] = STATES;
  user: any;

  userForm: FormGroup;
  full_name: FormControl;
  email: FormControl;
  address: FormControl;
  city: FormControl;
  phone_number: FormControl;
  state: FormControl;
  postal_code: FormControl;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    delete this.user.role;

    this.full_name = this.fb.control('', Validators.required);
    this.email = this.fb.control('', Validators.required);
    this.address = this.fb.control('');
    this.city = this.fb.control('', Validators.required);
    this.phone_number = this.fb.control('');
    this.state = this.fb.control('Aguascalientes', Validators.required);
    this.postal_code = this.fb.control('', Validators.required);

    this.userForm = this.fb.group({
      _id: '',
      full_name: this.full_name,
      email: this.email,
      address: this.address,
      state: this.state,
      city: this.city,
      postal_code: this.postal_code,
      phone_number: this.phone_number
    });

    this.userForm.setValue(this.user);
  }
}
