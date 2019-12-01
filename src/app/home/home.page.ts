
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
      this.token=obj.access_token
    });
  }

  createUser() {
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var emailid = document.getElementById('email').value;
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
    var start_date = document.getElementById("startDate").value;
    var end_date = document.getElementById("expiryDate").value;
    var amt_insured = document.getElementById("amtInsured").value;
    var geo_co = this.getGeoCoordinate();
    var json = "{ \"workflowFunctionID\": 20,\"workflowActionParameters\":  [{\"name\": \"amt_insured\",\"value\": \""+amt_insured+"\",\"workflowFunctionParameterId\": 18},{\"name\": \"starting\",\"value\": \""+start_date+"\",\"workflowFunctionParameterId\": 19},{\"name\": \"expiring\",\"value\": \""+end_date+"\",\"workflowFunctionParameterId\": 20},{\"name\": \"geo\", \"value\": \""+geo_co+"\", \"workflowFunctionParameterId\": 21 }] }"
    this.user = this.api.createConractAPI(json,this.token);
    this.user.subscribe(data => {
      console.log('my contract: ', data);
    this.status = "Contract created successfully";
    this.contractId = data;
    this.status = data;
    });

  }

  contractStatus() {
    this.cstate = this.api.getContractStatus("24",this.token);
    this.cstate.subscribe(data => {
      console.log('my status: ',data);
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
    for ( var i = 0; i < 15; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 getGeoCoordinate() {
  var gc11 = parseFloat(document.getElementById('geoCor11').value);
  var gc21 = parseFloat(document.getElementById('geoCor21').value);
  var gc31 = parseFloat(document.getElementById('geoCor31').value);
  var gc41 = parseFloat(document.getElementById('geoCor41').value);

  var gc12 = parseFloat(document.getElementById('geoCor12').value);
  var gc22 = parseFloat(document.getElementById('geoCor22').value);
  var gc32 = parseFloat(document.getElementById('geoCor32').value);
  var gc42 = parseFloat(document.getElementById('geoCor42').value);

  var xgc = (gc11+gc21+gc31+gc41)/4;
  var ygc = (gc12+gc22+gc32+gc42)/4;
  return xgc+","+ygc;

 }

}
