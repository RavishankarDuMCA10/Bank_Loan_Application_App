import { Component, inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IAPIResponse, IApplicationList } from '../../model/loan';

@Component({
  selector: 'app-loan-application-list',
  imports: [],
  templateUrl: './loan-application-list.component.html',
  styleUrl: './loan-application-list.component.css'
})
export class LoanApplicationListComponent {

  masterSrv = inject(MasterService);
  applicationList:IApplicationList [] = []

  constructor () {
    if(this.masterSrv.loggedUserData.role == "Customer"){
      this.getCustomerApplications()
    } else {
      this.getAssignedApplications()
    }
  }

  getCustomerApplications() {
    this.masterSrv.getMyApplications(this.masterSrv.loggedUserData.userId).subscribe((res:IAPIResponse)=>{
      this.applicationList = res.data
    })
  }

  getAssignedApplications() {
    this.masterSrv.getApplicationsAssingned(this.masterSrv.loggedUserData.userId).subscribe((res:IAPIResponse)=>{
      this.applicationList = res.data
    })
  }

  setStatus(event:any, panNo: string) {
    this.masterSrv.changeStatus(event.target.value, panNo).subscribe((res:IAPIResponse)=>{
      if (res.result) {
        alert("Status Changed")
      } else {
        alert(res.message)
      }
    })
  }
}
