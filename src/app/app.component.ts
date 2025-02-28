import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MasterService } from './services/master.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Bank_Loan_Application_App';
  loggedUserData: any;

  masterSrv = inject(MasterService);

  constructor() {
    this.masterSrv.onLogged.subscribe((res:boolean)=> {
      if (res) {
        this.masterSrv.readLoggedData();
      }
    })
  }

  logOff() {
    sessionStorage.removeItem('bankUser')
    this.masterSrv.loggedUserData = undefined;
  }
}
