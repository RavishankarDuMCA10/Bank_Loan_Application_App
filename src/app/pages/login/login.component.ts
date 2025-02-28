import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  
  showRegisterForm = signal<boolean>(false);
  http = inject(HttpClient);
  router = inject(Router)
  masterSrv = inject(MasterService)

  customerObj: any = {
    "userId": 0,
    "userName": "",
    "emailId": "",
    "fullName": "",
    "password": ""
  };

  loginForm: FormGroup = new FormGroup ({
    userName: new FormControl(""),
    password: new FormControl("")
  })
  loginObj: any = {
    "userName": "",
    "password": ""
  }

  constructor() {
  }
  changeView(){
    this.showRegisterForm.set(!this.showRegisterForm());
  }

  onRegister() {
    this.http.post("https://projectapi.gerasim.in/api/BankLoan/RegisterCustomer", this.customerObj).subscribe((res:any)=>{
      if(res.result) {
        alert("Customer registered successfully!")
      } else {
        alert(res.message)
      }
    }, error=>{
      alert("Network error.")
    })
  }

  onLogin() {
    const formValue = this.loginForm.value;
    this.http.post("https://projectapi.gerasim.in/api/BankLoan/login", formValue).subscribe((res:any)=>{      
      if(res.result) {
        sessionStorage.setItem("bankUser", JSON.stringify(res.data));
        this.router.navigateByUrl("application-list");
        this.masterSrv.onLogged.next(true);
      } else {
        alert(res.message)
      }
    }, error=>{
      alert("Network error.")
    })
  }
}
