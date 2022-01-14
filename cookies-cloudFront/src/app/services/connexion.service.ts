import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(baseUrl + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(baseUrl + 'signup', {
      username,
      password
    }, httpOptions);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(baseUrl + 'user/' + id, httpOptions);
  }

  getAll(): Observable<any> {
    return this.http.get(baseUrl, httpOptions);
  }

  getUser(id: any): Observable<any> {
    return this.http.get(baseUrl+ id, httpOptions);
  }

  addAdress(id: any, data: any): Observable<any> {
    return this.http.put(baseUrl+ id, data, httpOptions);
  }
}
