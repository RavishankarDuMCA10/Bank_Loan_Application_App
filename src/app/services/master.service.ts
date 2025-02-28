import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAPIResponse, ILoan, IUser } from '../model/loan';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  onLogged: Subject<boolean> = new Subject<boolean>();
  loggedUserData!: any;

  constructor(private http: HttpClient) { 
    
    this.readLoggedData()
  }

  readLoggedData() {
    const loggedData = sessionStorage.getItem("bankUser")
    if (loggedData != null ) {
      this.loggedUserData = JSON.parse(loggedData);
    }
  }

  onSaveLoan(obj: ILoan) {
    
    return this.http.post<IAPIResponse>("https://projectapi.gerasim.in/api/BankLoan/AddNewApplication", obj);
  }

  getMyApplications(id: number) {
    return this.http.get<IAPIResponse>("https://projectapi.gerasim.in/api/BankLoan/GetMyApplications?customerId="+ id);
  }

  getApplicationsAssingned(id: number) {
    return this.http.get<IAPIResponse>("https://projectapi.gerasim.in/api/BankLoan/GetApplicationAssigneedToMe?bankEmployeeId="+ id);
  }

  changeStatus(status: string, panNo: string) {
    return this.http.get<IAPIResponse>("https://projectapi.gerasim.in/api/BankLoan/CheckApplicationStatus?panNo="+panNo+"&status="+status);
  }

}
