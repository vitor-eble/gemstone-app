import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GemstoneService {

  private apiUrl = '/api/skyblock/bazaar';

  constructor(private http: HttpClient) { }

  getBazaarData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
