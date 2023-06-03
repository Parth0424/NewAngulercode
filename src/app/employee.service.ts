import { Injectable } from '@angular/core';
import { Employee } from './models/employee-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseApiUrl: string = "http://localhost:5000/";

  constructor(private http: HttpClient) { }


  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseApiUrl + 'api/Employee');
  }

  addEmployee(employeeadd: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseApiUrl + 'api/Employee/add', employeeadd);
  }

  getEmployee(id: number):Observable<Employee>{
    return this.http.get<Employee>(this.baseApiUrl + 'api/Employee/'+ id)
  }

  deleteEmployee(id: number):Observable<Employee>{
    return this.http.delete<Employee>(this.baseApiUrl + 'api/Employee/delete?id='+ id)
  }

  editEmployee(employeechange:Employee):Observable<Employee>{
    return this.http.put<Employee>(this.baseApiUrl + 'api/Employee/edit',employeechange);
  }
}
