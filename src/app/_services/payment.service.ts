import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { API_URL } from "./API_URL";
import { map } from 'rxjs/operators';

declare const OpenPay;

@Injectable()

export class PaymentService {
  private sessionId: any;
  constructor(
    private http: HttpClient
  ) {
    OpenPay.setId('m0iq0i9gyifam7hggdoe');
  ​  OpenPay.setApiKey('pk_a0b268498964405585c43d813af96e7d');
    OpenPay.setSandboxMode(true);

    this.sessionId = OpenPay.deviceData.setup();
  }

  createToken() {

    OpenPay.token.create({
          "card_number":"4111111111111111",
          "holder_name":"Juan Perez Ramirez",
          "expiration_year":"20",
          "expiration_month":"12",
          "cvv2":"110",
          "address":{
            "city":"Querétaro",
            "line3":"Queretaro",
            "postal_code":"76900",
            "line1":"Av 5 de Febrero",
            "line2":"Roble 207",
            "state":"Queretaro",
            "country_code":"MX"
          }
    }, console.log, console.error);
  }

  add_card(token: string): Observable<any> {
    return this.http.post(`${API_URL}/api/customer/add_card`, {token_id: token, device_session_id: this.sessionId});
  }
}
