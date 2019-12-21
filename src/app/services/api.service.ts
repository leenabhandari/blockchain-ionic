
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams, HttpResponse } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
 
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient) { }
 
  getFilms() {
    return this.http.get('https://swapi.co/api/films');
  }
 
  // getFilm(id) {
  //   return this.http.get(`https://swapi.co/api/films/${id}`);
  // }

  getContractStatus(id:string, token:string) {
    var headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + token);
    // return this.http.get("https://icertislasttime-roevlw-api.azurewebsites.net/api/v1/contracts/"+id,{
    //   headers:headers
    // });
    return this.http.get("https://icertishackathon-cfezfn-api.azurewebsites.net/api/v1/contracts/"+id,{
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

    return this.http.post('http://api.worldweatheronline.com/premium/v1/past-weather.ashx',body,{
      headers: headers
    });
  }
  
  getToken() {
    var headers = new HttpHeaders();
    let body = new HttpParams();
    body = body.set('resource','9014eace-1c9d-4aa1-9616-63cdedc486f8');
    body = body.set('client_id','25b74a50-7903-44cc-891c-34955f2f6d2a');
    body = body.set('client_secret','vlBtr08zNC?kgi1A1XSBtg[Z][qMUz46');
    body = body.set('grant_type','client_credentials');
    headers= headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('https://login.microsoftonline.com/c66186e2-9a63-4033-a1d8-ebeae6a16a33/oauth2/token',body,{
      headers :headers
    });
  }

  createUserAPI( raw:string, token:string) {
    var headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set("Authorization", "Bearer " + token);
    return this.http.post('https://icertishackathon-cfezfn-api.azurewebsites.net/api/v1/users', raw,{
      headers:headers
    });
  }

  createConractAPI(raw:string,token:string) {
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set("Authorization", "Bearer " + token);
    return this.http.post("https://icertishackathon-cfezfn-api.azurewebsites.net/api/v1/contracts?workflowId=1&contractCodeId=1&connectionId=1", raw,{
      headers:headers
    });

    

  }

  createConractAction(raw:string,token:string,contractId:string) {
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set("Authorization", "Bearer " + token);
    return this.http.post("https://icertishackathon-cfezfn-api.azurewebsites.net/api/v1/contracts/"+contractId+"/actions", raw,{
      headers:headers
    });
  
}
}