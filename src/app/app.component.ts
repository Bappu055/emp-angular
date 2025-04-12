import { Component } from '@angular/core';

import { EmployeeComponent } from "./employee/employee.component";
import { UserService } from './services/user.service';



@Component({
  selector: 'app-root',
  imports: [ EmployeeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  emp = '';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchEmp();
  }

  fetchEmp(): void {
    this.userService.getEmp().subscribe((data: any) => {
      this.emp = data.emp;
      console.log(data);
    });
  }
}
