
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient) { }
 
  // getFilms() {
  //   return this.http.get('https://swapi.co/api/films');
  // }
 
  // getFilm(id) {
  //   return this.http.get(`https://swapi.co/api/films/${id}`);
  // }

  getContractStatus(id:string, token:string) {
    var headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + token);
    return this.http.get("https://icertislasttime-roevlw-api.azurewebsites.net/api/v1/contracts/"+id,{
      headers:headers
    });
  }
  
  getWeather() {
    var body1 = 'date=2019-04-24&enddate=2019-10-23&tp=24&format=json&key=1a24becf2c774bb686340359192111&q=48.834,2.394';
    var headers = new HttpHeaders();
    let body = new HttpParams();
    body = body.set('date', '2019-04-24');
    body = body.set('enddate', '2019-10-23');
    body = body.set('tp', '24');
    body = body.set('format', 'json');
    body = body.set('key', '1a24becf2c774bb686340359192111');
    body = body.set('q', '48.834,2.394');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    // return this.http.post('http://api.worldweatheronline.com/premium/v1/past-weather.ashx',body,{
    //   headers: headers
    // });
  }
  
  getToken() {
    var headers = new HttpHeaders();
    let body = new HttpParams();
    body = body.set('resource','944e7e60-6ffa-4117-96be-7d9a39d07fc0');
    body = body.set('client_id','0b917a22-0fa8-4bae-8d36-5f95120b566a');
    body = body.set('client_secret','KN4Ej3ACB5NiEf-5dn-Eza/ChiqoJOA[');
    body = body.set('grant_type','client_credentials');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('https://login.microsoftonline.com/6f591103-8df8-4289-bc45-4117ed552ba3/oauth2/token',body,{
      headers :headers
    });
  }

  createUserAPI( raw:string, token:string) {
    var headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set("Authorization", "Bearer " + token);
    return this.http.post('https://icertislasttime-roevlw-api.azurewebsites.net/api/v2/users', raw,{
      headers:headers
    });
  }

  createConractAPI(raw:string,token:string) {
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set("Authorization", "Bearer " + token);
    return this.http.post("https://icertislasttime-roevlw-api.azurewebsites.net/api/v2/contracts?workflowId=4&contractCodeId=4&connectionId=1", raw,{
      headers:headers
    });

  }

   


  
}