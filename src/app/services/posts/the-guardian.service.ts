import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonServicesService } from './common-services.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TheGuardianService extends CommonServicesService{

  constructor(httpClient: HttpClient) { super(httpClient) }

  fetchNewsPosts(url: string): Observable<any> {
    return super.fetchNewsPosts(url);
  }

}