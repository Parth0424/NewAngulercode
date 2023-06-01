import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee-model';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

employees:Employee[]=[];

constructor(private employeeService:EmployeeService,private router:Router){}

ngOnInit(): void {
 this.getAllEmployee();
}
getAllEmployee(){
  this.employeeService.getAllEmployee().subscribe((data)=>{
    this.employees=data;
    console.log(data);
   }); 
}
onedit(id:number){
  this.router.navigate(["edit/"+id]);
}
ondelete(id:number){
  console.log(id);
  this.employeeService.deleteEmployee(id).subscribe((data)=>{
    
  });
  location.reload();
}
}
