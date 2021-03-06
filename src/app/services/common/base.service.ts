import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * This class is the base for all services classes with common methods.
 */
@Injectable({
  providedIn: 'root'
})
export default class BaseService {

  private serviceArgURL: string;
  private serviceArgKey: string;

  constructor(private httpClient: HttpClient) { }

  /**
   * This method fetches the data from the provided URL.
   * The URL can be localed on the web or locally.
   * 
   * @param url : This is the url from where to fetch the data
   */
  protected fetchDataFromURL(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  /**
   * This method fetches the data from the provided URL.
   * The URL can be localed on the web or locally.
   * 
   * @param url : This is the url from where to fetch the data
   */
  protected fetchNewsPosts(url: string): Observable<any> {
    return this.fetchDataFromURL(url);
  }

}
