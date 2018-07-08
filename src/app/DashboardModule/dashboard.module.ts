import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./DashboardComponent/dashboard.component";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./UserComponent/user.component";
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PaymentComponent } from "./PaymentComponent/payment.component";
import { PaymentService } from "../_services/payment.service";
import { CreditCardPipe } from "../_pipes/card.pipe";
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', redirectTo: 'me', pathMatch: 'full' },
    { path: 'me', component: UserComponent },
    { path: 'payment', component: PaymentComponent }
  ]}
]

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    PaymentComponent,
    CreditCardPipe
  ],
  providers: [
    PaymentService
  ]
})

export class DashboardModule {}
