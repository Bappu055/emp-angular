import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

interface Employee {
  id: number;
  name: string;
  emailId: string;
  mobile: number;
  country: string;
}

@Component({
  standalone: true,
  selector: 'app-employee', 
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  newEmployee: Partial<Employee> = {};
  editingEmployee: Employee | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.userService.getEmp().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
      }
    });
  }

  addEmployee(): void {
    if (this.newEmployee.name && this.newEmployee.emailId && this.newEmployee.mobile && this.newEmployee.country) {
      const newEmp = {
        id: Date.now(),
        name: this.newEmployee.name,
        emailId: this.newEmployee.emailId,
        mobile: this.newEmployee.mobile,
        country: this.newEmployee.country
      } as Employee;
      this.employees.push(newEmp);
      this.newEmployee = {};
    }
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(emp => emp.id !== id);
  }

  editEmployee(emp: Employee): void {
    this.editingEmployee = { ...emp };
  }

  updateEmployee(): void {
    if (this.editingEmployee) {
      const index = this.employees.findIndex(e => e.id === this.editingEmployee!.id);
      this.employees[index] = this.editingEmployee;
      this.editingEmployee = null;
    }
  }

  cancelEdit(): void {
    this.editingEmployee = null;
  }
}

