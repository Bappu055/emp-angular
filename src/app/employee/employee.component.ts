import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

interface Employee {
  id: number;
  name: string;
  Email: string;
  Mobile: number;
  Contry: string;
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
    if (this.newEmployee.name && this.newEmployee.Email && this.newEmployee.Mobile && this.newEmployee.Contry) {
      const newEmp = {
        id: Date.now(),
        name: this.newEmployee.name,
        Email: this.newEmployee.Email,
        Mobile: this.newEmployee.Mobile,
        Contry: this.newEmployee.Contry
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

