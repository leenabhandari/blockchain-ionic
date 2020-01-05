import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';

import { NavController, ActionSheetController, LoadingController } from '@ionic/angular';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';
import { NgProgress } from '@ngx-progressbar/core';
import {Tesseract} from "tesseract.ts";

import { HTTP } from '@ionic-native/http/ngx';



@Component({
  selector: 'app-contract',
  templateUrl: 'contract.page.html',
  styleUrls: ['contract.page.scss'],
})
export class ContractPage implements OnInit {
  values:  Observable<any>;
  selectedImage: string;
  imageText: string;
  token:string;
  user: Observable<any>;
  predict: Observable<any>;
  status : string;
  contractId: string;
  cstate : Observable<any>;
  geoCor11: string;
  geoCor21: string;
  geoCor31: string;
  geoCor41: string;
  geoCor12: string;
  geoCor22: string;
  geoCor32: string;
  geoCor42: string;
  startDate:string;
  expiryDate:string;
  amtInsured:string;
  policyId:string;
  fname:string;
  lname:string;
  email:string;
  token1:string;

  cropType:string;
  season:string;
  area:string;

  constructor(public http:HTTP,private api: ApiService,public navCtrl: NavController, private camera: Camera, private actionSheetCtrl: ActionSheetController, public progress: NgProgress) {}
  ngOnInit(){
   
    this.values = this.api.getToken();
    this.values.subscribe(data => {
      console.log('my data: ', data);
      var obj = JSON.parse(JSON.stringify(data));
      this.token1=obj.access_token
    });
    this.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InBpVmxsb1FEU01LeGgxbTJ5Z3FHU1ZkZ0ZwQSIsImtpZCI6InBpVmxsb1FEU01LeGgxbTJ5Z3FHU1ZkZ0ZwQSJ9.eyJhdWQiOiI5MDE0ZWFjZS0xYzlkLTRhYTEtOTYxNi02M2NkZWRjNDg2ZjgiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9jNjYxODZlMi05YTYzLTQwMzMtYTFkOC1lYmVhZTZhMTZhMzMvIiwiaWF0IjoxNTc2OTk1MTQxLCJuYmYiOjE1NzY5OTUxNDEsImV4cCI6MTU3Njk5OTA0MSwiYWlvIjoiNDJWZ1lCQlVyR282K1o2ZDd5djdpNDNkMHhJdkFRQT0iLCJhcHBpZCI6ImFiZWFiNzIxLTdlYTctNDY4MS1hM2ViLTM3MGY3OTA1MDk1YiIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2M2NjE4NmUyLTlhNjMtNDAzMy1hMWQ4LWViZWFlNmExNmEzMy8iLCJvaWQiOiI5MDE0NTEyNC0wZjEwLTQ2MzUtOTU3ZC1mODIyNzZmNGE0YzAiLCJyb2xlcyI6WyJBZG1pbmlzdHJhdG9yIl0sInN1YiI6IjkwMTQ1MTI0LTBmMTAtNDYzNS05NTdkLWY4MjI3NmY0YTRjMCIsInRpZCI6ImM2NjE4NmUyLTlhNjMtNDAzMy1hMWQ4LWViZWFlNmExNmEzMyIsInV0aSI6InVBeGttSHNQSUVhb1ZYUlZHWXg2QUEiLCJ2ZXIiOiIxLjAifQ.RFFd21KB5P_2uNX20P9NKZLTbf6393LANJZUIwCWwjk86X8kocF3mn9P0LdFhWiRhXWPifL5_8crlVWaZA2MgRxlvEVQ_bPmypNDqou2AfM7YvUSbH7PUBdfy8AIog5vlZAGP7_DFRQTQRkFLV65bXPl194G27FgJ7J9Z27GUUGdrLY_Ou60GQzqQGh4XTUOEaDS1Ky-jnCzidH-FWK0lkfv8RCVHrJUhr3fYzNecmsTTNEuIT7JetpFNG6wYuhWX_VZz1EoLgUpgZyuk42uI3GSvkHy299RV2GS3nT07hwE4mnkCHpBcqxCmQQEVReHT8M9zSEv_5Wapj8sJX2PwA'
    
   }

  createUser() {
    var fname = this.fname;
    var lname = this.lname;
    var emailid = this.email;
    var external = this.makeid();
    var json = "{\"externalID\": \"" +this.makeid()+"\" ,\"firstName\": \""+fname+"\" ,\"lastName\": \""+lname+"\" ,\"emailAddress\": \""+emailid+"\"}";
    this.user = this.api.createUserAPI(json,this.token);
    this.user.subscribe(data => {
      console.log('my data: ', data);
    this.status = "User created successfully"
    });

    console.log(json);
  }

  createContract() {
    this.roleSwitch1();
    var start_date = this.startDate;
    var end_date = this.expiryDate;
    var amt_insured = this.amtInsured;
    var geo_co = this.getGeoCoordinate();
    var gc11 = parseFloat(this.geoCor11);
    var gc12 = parseFloat(this.geoCor12);
    //  geo_co = "4,7";
     // start_date = new Date(Date.parse("12-12-2019"));
     // end_date = new Date(Date.parse("12-12-2020"));
    //  amt_insured = "19999";

    //var json = "{ \"workflowFunctionID\": 20,\"workflowActionParameters\":  [{\"name\": \"amt_insured\",\"value\": \""+amt_insured+"\",\"workflowFunctionParameterId\": 18},{\"name\": \"starting\",\"value\": \""+start_date+"\",\"workflowFunctionParameterId\": 19},{\"name\": \"expiring\",\"value\": \""+end_date+"\",\"workflowFunctionParameterId\": 20},{\"name\": \"geo\", \"value\": \""+geo_co+"\", \"workflowFunctionParameterId\": 21 }] }"
    var json = "{ \"workflowFunctionID\": 1,\"workflowActionParameters\":  [{\"name\": \"amt_insured\",\"value\": \""+amt_insured+"\",\"workflowFunctionParameterId\": 1},{\"name\": \"starting\",\"value\": \""+start_date+"\",\"workflowFunctionParameterId\": 2},{\"name\": \"expiring\",\"value\": \""+end_date+"\",\"workflowFunctionParameterId\": 3},{\"name\": \"geo\", \"value\": \""+geo_co+"\",\"workflowFunctionParameterId\": 4}]}"
    this.user = this.api.createConractAPI(json,this.token);
    this.user.subscribe(data => {
      console.log('my contract: ', data);
    this.status = "Contract created successfully";
    this.contractId = data;
    this.status = data;
    });

  }

  getRes() {
    var x = 1;
      if(this.season == 'Kharif') {
        x = 2;
      }
    this.amtInsured = String(Math.round(11000/989 * parseInt(this.area) * 10000 * x));
  //   var json = "{\"Inputs\": {\"input1\":[{\"YEAR\": \"2020\" } ]},\"GlobalParameters\":  {}}";
  //   let headers = {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer pVVWGyCODkd7y5B4DbtkJiE22Vyb1u3R5/X+rb+LG5q9sMztM/qhqFNbjEo9zsA4Om3WdUZDOrjvZsEcvlE0cg=='
  // };
  //   this.http.post(
  //     'https://ussouthcentral.services.azureml.net/workspaces/439d06ed85c74a2cafcb1b6a0d7c39a0/services/b847d834aa1a4a5380bc145dae7a32ed/execute?api-version=2.0&format=swagger',             //URL
  //     json,         //Data 
  //     headers // Headers
  //    )
  //    .then(response => {
  //       // prints 200
  //       console.log(response.status);
  //       console.log(response.data);
  //       var navin=response.data.split("Labels:");
  //      var navin1=navin.split("}");
  //      console.log(navin1[0]);
  //       // try {
  //       //   response.data = JSON.parse(response.data);
  //       //   // prints test
  //       //   console.log(response.data.message);
  //       // } catch(e) {
  //       //   console.error('JSON parsing error');
  //       // }
  //    })
  //    .catch(response => {
  //      // prints 403
  //      console.log(response.status);
  
  //      // prints Permission denied
  //      console.log(response.error);
  //    });


    // let xx = this.api.getMLres(json);
    // this.predict.subscribe(data=> {
    //   console.log('ML result',data);
    //   // let full_content = JSON.parse(JSON.stringify(data));
    //   // let results = full_content.Results;
    //   // let temp = JSON.parse(JSON.stringify(results));
    //   // let out = temp.output1;
    //   // let wanted = JSON.parse(JSON.stringify(out[0]));
    //   // let val = wanted."Scored Labels".value;
      
      
    //   var navin=data.split("Labels:");
    //   var navin1=navin.split("}");
    //   console.log(navin1[0]);

    // })
  }

  takeAction() {
    this.roleSwitch();
    var policy_id = this.policyId;
    var json = "{\"workflowFunctionID\": 2,\"workflowActionParameters\": [ ] }";
    this.user = this.api.createConractAction(json,this.token,policy_id);
    this.user.subscribe(data => {
      
      console.log('my contract action: ', data);
    this.status = "Contract claimed initiated and will be processed if conditions are met";
    },
    err => {console.log(err);
    this.status = "Contract claim has already been initiated.";
   }
    );

  }

  roleSwitch() {
  
    var json = "{\"userId\": 7,\"applicationRoleId\": 2}";
    this.user = this.api.changeRole(json,this.token);
    this.user.subscribe(data => {
      
      console.log('my role change: ', data);
    
    }
    
    );

  }
  roleSwitch1() {
  
    var json = "{\"userId\": 7,\"applicationRoleId\": 1}";
    this.user = this.api.changeRole(json,this.token);
    this.user.subscribe(data => {
      
      console.log('my role change: ', data);
    
    }
    
    );

  }


  contractStatus() {
    var policy_id = this.policyId;
    this.cstate = this.api.getContractStatus(policy_id,this.token);
    this.cstate.subscribe(data => {
      console.log('my status: ',data);
      let full_content = JSON.parse(JSON.stringify(data));
      let contract_list = full_content.contractProperties;
      let wanted_workflow = JSON.parse(JSON.stringify(contract_list[1]));
      let val = wanted_workflow.value;
      if(val == "1") {
        this.status = "Not claimed";
      } else if(val == "2"){
        this.status = "Claim initiated";
      } else if(val == "3") {
        this.status = "Claim successful";
      }

    })
  }
  


getPicture(sourceType: PictureSourceType) {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.selectedImage = `data:image/jpeg;base64,${imageData}`;
    });
  }

  async selectSource() {    
        let actionSheet = this.actionSheetCtrl.create({
          buttons: [
            {
              text: 'Use Library',
              handler: () => {
                this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
              }
            }, {
              text: 'Capture Image',
              handler: () => {
                this.getPicture(this.camera.PictureSourceType.CAMERA);
              }
            }, {
              text: 'Cancel',
              role: 'cancel'
            }
          ]
        });
        (await actionSheet).present();
      }
  

  recognizeImage() {
    Tesseract
    .recognize(this.selectedImage)
    .progress(console.log)
    .then((res: any) => {
        //console.log(res);
        this.imageText = res.text;
        let email = this.extractEmails(this.imageText);
        console.log('email',email);
        
        this.getDate(this.imageText);
        let amot = this.extractAmt(this.imageText);
        console.log('amt',amot);
        this.amtInsured = amot[0].slice(1);
        var geoco = this.extractGeoCo(this.imageText);
        console.log('geoco',geoco);

    })
    .catch(console.error);
  }

  extractEmails (text: string)
  {
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  }

  extractGeoCo(text:string) {
    let trial=text.split("Geocoordinates:");

var res = trial[1].split("(");
 var res_1=res[1].split(",");
  var res_2=res_1[1].split(")");
  //res_1[0]=x1 & res_2[0]=y1
  //document.getElementById("demo").innerHTML = "First Name:"+res_1[0]+"<br>"+res_2[0];
 var res_3=res[2].split(",");
 var res_4=res_3[1].split(")");
  //res_3[0]=x2 & res_4[0]=y2
 var res_5=res[3].split(",");
 var res_6=res_5[1].split(")");
  //res_5=x3 & res_6=y3
 var res_7=res[4].split(",");
 var res_8=res_7[1].split(")");
this.geoCor11 = res_1[0];
this.geoCor12 = res_2[0];
this.geoCor21 = res_3[0];
this.geoCor22 = res_4[0];
this.geoCor31 = res_5[0];
this.geoCor32 = res_6[0];
this.geoCor41 = res_7[0];
this.geoCor42 = res_8[0];

 return "x1="+res_1[0]+" y1="+res_2[0]+"<br>x2="+res_3[0]+" y2="+res_4[0]+"<br>x3="+res_5[0]+" y3="+res_6[0]+"<br>x4="+res_7[0]+" y4="+res_8[0];
  }


extractAmt(str:string) {
  return str.match(/(?:EUR|[$]|[₹])\s*\d+(?:\.\d{2})?/gi);
}

 getDate(d:string)
{
  let pattern = /[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}/g;
   const words = d.split("\\s+");
   let pats = [];
  words.forEach((s) => {
    console.log(s.match(pattern));
    pats.push(s.match(pattern));
  });
  console.log('words',words);
  console.log('pats',pats);
  //var enddate=pats[0].split(",");
  this.startDate = pats[0][0];
  this.expiryDate = pats[0][1];
  
  //this.expiryDate = new Date(Date.parse(words[1]));
    //var day:string, month:string, year:string;

    //let result = d.match("[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}");
    // if(null != result) {
    //     let dateSplitted = result[0].split(result[1]);
    //     day = dateSplitted[0];
    //     month = dateSplitted[1];
    //     year = dateSplitted[2];
    // }
    // result = d.match("[0-9]{4}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{2}");
    // if(null != result) {
    //     let dateSplitted = result[0].split(result[1]);
    //     day = dateSplitted[2];
    //     month = dateSplitted[1];
    //     year = dateSplitted[0];
    // }

    // return month+"/"+day+"/"+year;
}


  makeid() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 20; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 getGeoCoordinate() {
  var gc11 = parseFloat(this.geoCor11);
  var gc21 = parseFloat(this.geoCor21);
  var gc31 = parseFloat(this.geoCor31);
  var gc41 = parseFloat(this.geoCor41);

  var gc12 = parseFloat(this.geoCor12);
  var gc22 = parseFloat(this.geoCor22);
  var gc32 = parseFloat(this.geoCor32);
  var gc42 = parseFloat(this.geoCor42);

  var xgc = (gc11+gc21+gc31+gc41)/4;
  var ygc = (gc12+gc22+gc32+gc42)/4;
  return xgc+","+ygc;

 }

}
