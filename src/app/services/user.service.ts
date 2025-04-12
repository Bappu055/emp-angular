
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  apiUrl = 'http://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee';

  constructor(private http: HttpClient) {}

  getEmp(): Observable<any> {
    return this.http.get(this.apiUrl);

  }
}
