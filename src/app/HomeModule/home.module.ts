import { NgModule } from "@angular/core";
import { RegisterComponent } from "./RegisterComponent/register.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { ClarityModule } from '@clr/angular';
import { LoginComponent } from "./LoginComponent/login.component";
import { PaymentService } from "../_services/payment.service";

const ROUTES: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  providers: [
    PaymentService
  ]
})

export class HomeModule {}
