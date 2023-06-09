import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute,private Router:Router) { }
  editEmployee: any = {
    id: 0,
    firstName: '',
    lastName: '',
    contact: 0,
    email: '', 
    age: 0,
    userName:'',
    password: '', // corrected typo
  };
   errorMessage: string = '';
  ngOnInit(): void {
    this.getEmployee();
  }
  onSubmit() {
    this.EditEmployee();
  }
  getEmployee() {
    this.route.paramMap.subscribe((params) => {
      const employeeId = params.get('id');
      console.log(employeeId);
  
      if (employeeId) {
        this.editEmployee.id = parseInt(employeeId); // Convert to a number
        this.employeeService.getEmployee(this.editEmployee.id).subscribe((data) => {
          this.editEmployee = data;
          console.log(data);
        });
      }
    });
  }
  

  EditEmployee(){
    this.employeeService.editEmployee(this.editEmployee).subscribe((data)=>{
      this.Router.navigate(['view']);
    },
    (error) => {
      if (error.status === 400 && error.error) {
        const validationErrors = error.error;
        this.errorMessage = '';

        for (const fieldName in validationErrors) {
          if (validationErrors.hasOwnProperty(fieldName)) {
            const fieldErrors = validationErrors[fieldName];
            this.errorMessage += fieldErrors.join(', ') + ' ';
          }
        }
      }
    }
  )
  }
}