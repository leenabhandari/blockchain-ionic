
// import { Component } from '@angular/core';
// import { NavController, ActionSheetController, LoadingController } from '@ionic/angular';
// import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';
// import * as Tesseract from 'tesseract.js'
// import { NgProgress } from '@ngx-progressbar/core';
 
// @Component({
//     selector: 'app-home',
//     templateUrl: 'home.page.html',
//     styleUrls: ['home.page.scss'],
//   })
// export class HomePage {
 
//   selectedImage: string;
//   imageText: string;
 
//   constructor(public navCtrl: NavController, private camera: Camera, private actionSheetCtrl: ActionSheetController, public progress: NgProgress) {
//   }
 
//   async selectSource() {    
//     let actionSheet = this.actionSheetCtrl.create({
//       buttons: [
//         {
//           text: 'Use Library',
//           handler: () => {
//             this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
//           }
//         }, {
//           text: 'Capture Image',
//           handler: () => {
//             this.getPicture(this.camera.PictureSourceType.CAMERA);
//           }
//         }, {
//           text: 'Cancel',
//           role: 'cancel'
//         }
//       ]
//     });
//     (await actionSheet).present();
//   }
 
//   getPicture(sourceType: PictureSourceType) {
//     this.camera.getPicture({
//       quality: 100,
//       destinationType: this.camera.DestinationType.DATA_URL,
//       sourceType: sourceType,
//       allowEdit: true,
//       saveToPhotoAlbum: false,
//       correctOrientation: true
//     }).then((imageData) => {
//       this.selectedImage = `data:image/jpeg;base64,${imageData}`;
//     });
//   }
 
//   recognizeImage() {
//     Tesseract.recognize(this.selectedImage)
//     .progress(message => {
//       if (message.status === 'recognizing text')
//       //this.progress.set(message.progress);
//       console.log(message.status);
//     })
//     .catch(err => console.error(err))
//     .then(result => {
//       this.imageText = result.text;
//     })
//     .finally(resultOrError => {
//       //this.progress.complete();
//     });
//   }
 
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

import { NavController, ActionSheetController, LoadingController } from '@ionic/angular';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';
import { NgProgress } from '@ngx-progressbar/core';
import {Tesseract} from "tesseract.ts";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  values:  Observable<any>;
  selectedImage: string;
  imageText: string;
  token:string;
  user: Observable<any>;
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
  constructor(private api: ApiService,public navCtrl: NavController, private camera: Camera, private actionSheetCtrl: ActionSheetController, public progress: NgProgress) {}
  ngOnInit(){
    //throw new Error("Method not implemented.");
    // this.values = this.api.getWeather();
    // this.values.subscribe(data => {
    //   console.log('my data: ', data);
    // });

    //throw new Error("Method not implemented.");
    this.values = this.api.getToken();
    this.values.subscribe(data => {
      console.log('my data: ', data);
      var obj = JSON.parse(JSON.stringify(data));
      this.token1=obj.access_token
    });

    this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkJCOENlRlZxeWFHckdOdWVoSklpTDRkZmp6dyIsImtpZCI6IkJCOENlRlZxeWFHckdOdWVoSklpTDRkZmp6dyJ9.eyJhdWQiOiI5NDRlN2U2MC02ZmZhLTQxMTctOTZiZS03ZDlhMzlkMDdmYzAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC82ZjU5MTEwMy04ZGY4LTQyODktYmM0NS00MTE3ZWQ1NTJiYTMvIiwiaWF0IjoxNTc1NjA3Njc2LCJuYmYiOjE1NzU2MDc2NzYsImV4cCI6MTU3NTYxMTU3NiwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhOQUFBQWRSRnVkUExaQkd2VnVMMXRCT1VEMXlZbFo5bm9JMGR6N2JYQzJLbkxORUV6NlpmNTV1cW8yVWM0SkNyNzhpM1U5MEVTNGdaNnl5d0Rmd1FDMnpIQ1BaSnl4RjRVNjUvUHlDemVXaHhHQVMwPSIsImFtciI6WyJwd2QiXSwiYXBwaWQiOiI5NDRlN2U2MC02ZmZhLTQxMTctOTZiZS03ZDlhMzlkMDdmYzAiLCJhcHBpZGFjciI6IjAiLCJlbWFpbCI6InNydXNodGlpbmdhbGVAaG90bWFpbC5jb20iLCJmYW1pbHlfbmFtZSI6IklOR0FMRSIsImdpdmVuX25hbWUiOiJTUlVTSFRJIiwiaWRwIjoibGl2ZS5jb20iLCJpcGFkZHIiOiIxMjMuMjAxLjExNi4yMTEiLCJuYW1lIjoiU1JVU0hUSSBJTkdBTEUiLCJvaWQiOiIxMDdhMjcwNy02MzYxLTRhOTUtOGZhOS00ODg3NWI1MjEzY2UiLCJyb2xlcyI6WyJBZG1pbmlzdHJhdG9yIl0sInNjcCI6IlVzZXIuUmVhZCBVc2VyLlJlYWRCYXNpYy5BbGwiLCJzdWIiOiJodjJhSFVKNktPV2lacDN3VjZMMEV0NzlFQU1pV1JoeThqYUFSUkF1Q2tJIiwidGlkIjoiNmY1OTExMDMtOGRmOC00Mjg5LWJjNDUtNDExN2VkNTUyYmEzIiwidW5pcXVlX25hbWUiOiJsaXZlLmNvbSNzcnVzaHRpaW5nYWxlQGhvdG1haWwuY29tIiwidXRpIjoic0lILThPWUZjRWlCbm9LZTkwOENBZyIsInZlciI6IjEuMCJ9.kQ4L48vuaW0SEjwbvv-cfR8mpInVddI1Y8jXHIX1hm9oqD-df-w9Sp50Xc3oXUeMfbmkpzJsGVxIQtiWBkCt2VQdFr_e_YbYuTD5yScuaedVdcg5lEsaydQ4NL4ZA72LFTXqhT-H47b53w4huruR01WjrTyw-JhbgApk0ynDrETSrCjelowpEzNHi9SOeZZK1GFjye9RLcNHkFzYwL-_NhDcbZ6LKtvdiLtbx9nkGQzMhCGQ7_ifvSSE9esBRs1I4fd8tTOrYOXXeGgCho3gK2DAtA0aiFPUPAQodxicrooIBmr_Zbxcr5NYLrn-algk4VT37zdjdokRuHZLOdqaXw"
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
    var start_date = this.startDate;
    var end_date = this.expiryDate;
    var amt_insured = this.amtInsured;
    var geo_co = this.getGeoCoordinate();
    var gc11 = parseFloat(this.geoCor11);
    var gc12 = parseFloat(this.geoCor12);
     geo_co = "4,7";
     start_date = "12-12-2019";
     end_date = "12-12-2020";
     amt_insured = "19999";

    //var json = "{ \"workflowFunctionID\": 20,\"workflowActionParameters\":  [{\"name\": \"amt_insured\",\"value\": \""+amt_insured+"\",\"workflowFunctionParameterId\": 18},{\"name\": \"starting\",\"value\": \""+start_date+"\",\"workflowFunctionParameterId\": 19},{\"name\": \"expiring\",\"value\": \""+end_date+"\",\"workflowFunctionParameterId\": 20},{\"name\": \"geo\", \"value\": \""+geo_co+"\", \"workflowFunctionParameterId\": 21 }] }"
    var json = "{ \"workflowFunctionID\": 20,\"workflowActionParameters\":  [{\"name\": \"amt_insured\",\"value\": \""+amt_insured+"\",\"workflowFunctionParameterId\": 18},{\"name\": \"starting\",\"value\": \""+start_date+"\",\"workflowFunctionParameterId\": 19},{\"name\": \"expiring\",\"value\": \""+end_date+"\",\"workflowFunctionParameterId\": 20},{\"name\": \"geo\", \"value\": \""+geo_co+"\",\"workflowFunctionParameterId\": 21}]}"
    this.user = this.api.createConractAPI(json,this.token);
    this.user.subscribe(data => {
      console.log('my contract: ', data);
    this.status = "Contract created successfully";
    this.contractId = data;
    this.status = data;
    });

  }

  takeAction() {
    var policy_id = this.policyId;
    var json = "{\"workflowFunctionID\": 25,\"workflowActionParameters\": [ ] }";
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
    })
    .catch(console.error);
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
