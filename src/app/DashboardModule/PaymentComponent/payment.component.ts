import { Component, OnInit } from "@angular/core";
import { PaymentService } from "../../_services/payment.service";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

declare const OpenPay: any;

@Component({
  templateUrl: './payment.component.html'
})

export class PaymentComponent implements OnInit {
  card_form: boolean = false;
  number = '';

  cardForm: FormGroup;
  card_number: FormControl;
  holder_name: FormControl;
  expiration_year: FormControl;
  expiration_month: FormControl;
  cvv2: FormControl;

  constructor(
    private paymentService: PaymentService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.card_number = this.fb.control('', [Validators.required, Validators.minLength(19)]);
    this.holder_name = this.fb.control('', Validators.required);
    this.expiration_year = this.fb.control('', Validators.required);
    this.expiration_month = this.fb.control('', Validators.required);
    this.cvv2 = this.fb.control('', Validators.required);

    this.cardForm = this.fb.group({
      card_number: this.card_number,
      holder_name: this.holder_name,
      expiration_year: this.expiration_year,
      expiration_month: this.expiration_month,
      cvv2: this.cvv2
    });
  }

  add_card(){
    this.paymentService.createToken();
  }

  validateCard(card_number) {
    card_number = card_number.replace(/\s/g, '');

    if (card_number.length != 16) { return; }

    let result = OpenPay.card.cardType(card_number);
    console.log(result);
  }

  createCard() {
    const cardRequest = {
      'card_number': this.card_number.value.replace(/\s/g, ''),
      'holder_name': this.holder_name.value.toString(),
      'expiration_year': this.expiration_year.value.toString(),
      'expiration_month': this.expiration_month.value.toString(),
      'cvv2': this.cvv2.value.toString()
   };
   console.log(cardRequest);

   OpenPay.token.create(cardRequest,
    (token) => {
      console.log(token);
      this.paymentService.add_card(token.data.id).subscribe(
        card => {
          console.log(card);
        }
      )
   },
  function (error) {
    console.log(error)
  });
  }
}
