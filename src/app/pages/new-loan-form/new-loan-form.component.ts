import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { IAPIResponse } from '../../model/loan';

@Component({
  selector: 'app-new-loan-form',
  imports: [ReactiveFormsModule],
  templateUrl: './new-loan-form.component.html',
  styleUrl: './new-loan-form.component.css'
})
export class NewLoanFormComponent {

  loanAppForm: FormGroup = new FormGroup({});

  formBuilder = inject(FormBuilder);
  masterSrv = inject(MasterService)

  constructor() {
    this.initializeForm()    
    if (this.masterSrv.loggedUserData) {
      this.loanAppForm.controls['customerId'].setValue(this.masterSrv.loggedUserData.userId)
    }
  }

  initializeForm() {
    this.loanAppForm = this.formBuilder.group({
      applicationID:[0],
      fullName:[''],
      applicationStatus:[''],
      panCard: [''],
      dateOfBirth: [''],
      email:[''],
      phone: [''],
      address: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      annualIncome: [0],
      employmentStatus: [''],
      creditScore: [0],
      assets: [''],
      dateApplied: [new Date()],
      loans: this.formBuilder.array([this.createLoanGroup()]),
      customerId: [0]

      // applicationID:[0],
      // fullName:['', [Validators.required, Validators.minLength(3)]],
      // applicationStatus:['', Validators.required],
      // panCard: ['', [Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      // dateOfBirth: ['', Validators.required],
      // email:['', [Validators.required, Validators.email]],
      // phone: ['', [Validators.required, Validators.pattern('[0-9]{10}$')]],
      // address: ['', Validators.required],
      // city: ['', Validators.required],
      // state: ['', Validators.required],
      // zipCode: ['', [Validators.required, Validators.pattern('[0-9]{6}$')]],
      // annualIncome: [0, [Validators.required, Validators.min(0)]],
      // employmentStatus: ['', Validators.required],
      // creditScore: [0, [Validators.required, Validators.min(300), Validators.max(850)]],
      // assets: ['', Validators.required],
      // dateApplied: ['', Validators.required],
      // Loans: this.formBuilder.array([this.createLoanGroup()]),
      // customerId: [0, Validators.required]
    })
  }

  createLoanGroup(): FormGroup {
    return this.formBuilder.group({
      loanID:[0],
      applicationID:[0],
      bankName:[''],
      loanAmount:[0],
      emi:[0],
    })
  }

  get loanList(): FormArray {
    return this.loanAppForm.get('loans') as FormArray;
  }

  addNewLoan() {
    this.loanList.push(this.createLoanGroup())
  }

  removeLoan(index: number){
    this.loanList.removeAt(index)
  }

  onSave() {
    debugger
    const formValue = this.loanAppForm.value;

    this.masterSrv.onSaveLoan(formValue).subscribe((res:IAPIResponse)=>{
      debugger
      if (res.result) {
        alert("Loan Application Created Success.")
      } else {
        alert(res.message)
      }
    })
  }
}
