import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  addemployee: Employee ={
    id:0,
    firstName:'',
    lastName:'',
    contact:0,
    email:'',
    age:0,
    userName:'',
    password:'',
  };
  errorMessage: string = '';

  constructor(private employeeService:EmployeeService,private router :Router){}

  ngOnInit(): void {
    
  }

  onSubmit(){
    console.log(this.addemployee);
    this.addEmployee();
  }

  addEmployee(){
    this.employeeService.addEmployee(this.addemployee).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["view"]);
      },
      (error) => {
        if (error.status === 400 && error.error) {
          const validationErrors = error.error;
          this.errorMessage = '';

          for (const fieldName in validationErrors) {
            if (validationErrors.hasOwnProperty(fieldName)) {
              const fieldErrors = validationErrors[fieldName];
              this.errorMessage += `${fieldName} ${fieldErrors.join(', ')} `;
            }
          }
        }
      }
    );
  }
}
