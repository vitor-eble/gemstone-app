import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GemstoneService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBazaarData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
