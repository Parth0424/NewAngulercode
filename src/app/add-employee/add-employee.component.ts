import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee-model';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  
  errorMessage: string = '';

  addEmployeeForm: FormGroup = new FormGroup({});

constructor(
  private formBuilder: FormBuilder,
  private employeeService: EmployeeService,
  private router: Router
) {}


  ngOnInit(): void {
    this.createAddEmployeeForm();
  }

  createAddEmployeeForm() {
    this.addEmployeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      age: [0, Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  

  onSubmit() {
    if (this.addEmployeeForm.invalid) {
      this.errorMessage = 'Please fill in all the required fields.';
      return;
    }

    console.log(this.addEmployeeForm.value);
    this.addEmployee();
  }

  addEmployee() {
    this.employeeService.addEmployee(this.addEmployeeForm.value).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['view']);
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
