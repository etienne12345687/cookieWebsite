import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICookies } from '../utils/modele/cookies';

const baseUrl = 'http://localhost:8080/api/cookie';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: ICookies): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: ICookies): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}

