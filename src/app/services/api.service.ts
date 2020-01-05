import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams, HttpResponse } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { stringify } from 'querystring';
 
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

    // headers = headers.set('Strict-Transport-Security','max-age=31536000; includeSubDomains');
    // headers = headers.set('X-Content-Type-Options','nosniff');
    // headers = headers.set('x-ms-request-id','72f23a3d-ce61-470f-bdf3-80c926707200');
    // headers = headers.set('x-ms-ests-server','2.1.9767.22 - HKG2 ProdSlices');
  //headers = headers.set('Access-Control-Allow-Origin','*');
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

changeRole(raw:string,token:string) {
  var headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  headers = headers.set("Authorization", "Bearer " + token);
  return this.http.post("https://icertishackathon-cfezfn-api.azurewebsites.net/api/v1/applications/1/roleAssignments", raw,{
    headers:headers
  });
}

getMLres(raw:string) {
  var headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  headers = headers.set('Access-Control-Allow-Origin','origin');
    headers = headers.set('Access-Control-Allow-Methods','PUT, GET, POST, DELETE, OPTIONS, PATCH');
    headers = headers.set('Access-Control-Allow-Headers','accept, content-type');
  headers = headers.set("Authorization", "Bearer pVVWGyCODkd7y5B4DbtkJiE22Vyb1u3R5/X+rb+LG5q9sMztM/qhqFNbjEo9zsA4Om3WdUZDOrjvZsEcvlE0cg==" );
  return this.http.post("https://ussouthcentral.services.azureml.net/workspaces/439d06ed85c74a2cafcb1b6a0d7c39a0/services/b847d834aa1a4a5380bc145dae7a32ed/execute?api-version=2.0&format=swagger", raw,{
    headers:headers
  });

  
}

}