import { Component, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { Router } from '@angular/router';
import { GlobVarsService } from './glob-vars.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  percent: number = 0;
  radius: number = 100;
  fullTime: number = 0;
  elapsed: number = 0;
  stat: string = "Start";
  bstate: string = "danger";
  wstate: string = "danger";
  counting: boolean = true;
  devices: any[] = [];
  mimi: any;
  myVar;
  //id:any;
  prevArray: any[] = [];
  array: any[] = ['a', 'b', 'c', 'd'];
  wifistatus: string = "Not connected";
  blestatus: string = this.getServ.getCurrentBleStatus();

  constructor(public alertController: AlertController, private ble: BLE, private ngZone: NgZone, private router: Router, private getServ: GlobVarsService) { }
  measurements() { this.router.navigate(['measurements']) }
  bledevices() {
    //this.Scan();
    this.router.navigate(['bledevices']);
  }
  Scan() {
    this.devices = [];
    this.ble.scan([], 15).subscribe(device => this.onDeviceDiscovered(device));
    //alert(this.ble.read('18:93:D7:46:B2:71', service_uuid, characteristic_uuid,);
  }
  onDeviceDiscovered(device) {
    //console.log('Discovered' + JSON.stringify(device,null,2));
    this.ngZone.run(() => {
      this.devices.push(device)
      //console.log(device)
    })
    this.getServ.setBLEArray(this.devices);
  }
  
  ionViewWillEnter(){
    this.blestatus = this.getServ.getCurrentBleStatus();
    this.wifistatus = this.getServ.getCurrentWifiStatus();
    
  }
  ngOnInit() {
    setInterval(
      function myTimer2() {
        this.wifistatus=this.getServ.getCurrentWifiStatus();
        this.blestatus = this.getServ.getCurrentBleStatus();
        if(this.wifistatus.startsWith("Connected")){
          this.wstate = "success";
        }
        else{
          this.wstate = "danger";
        }
        if(this.blestatus.startsWith("Connected")){
          this.bstate = "success";
        }
        else{
          this.bstate = "danger";
          this.wifistatus = "Not connected";
          this.wstate = "danger";
        }
      }.bind(this), 1000);
  }



  buttonList() {
    this.prevArray = this.array;
  }
  indexx(idd) {
    alert(idd);
  }
  ident(index) {
    alert(this.devices[index].id);
  }
  Add() {
    this.percent = this.getServ.addnumber();
  }
  Subs() {
    this.percent = this.getServ.subnumber();
  }
  Get() {
    this.percent = this.getServ.getnumber();
  }
  Set() {
    this.getServ.setNumber(this.fullTime);
  }
  Subhome() { this.router.navigate(['subhome']) }

  go() { this.router.navigate(['subhome']) }

  sum() {

    this.percent = 201;
  }
  start1() {

    //this.ble.autoConnect('18:93:D7:46:B2:71', this.onConnected.bind(this), this.onDisconnected.bind(this));
  }
  start3() {/*
  this.ble.connect('18:93:D7:46:B2:71').subscribe(mimi => {
    alert(mimi);
  },
  peripheralData => {
    console.log('disconnected');
  });*/
    this.fullTime = this.devices.length;
    this.mimi = this.devices[0].id;
    alert(this.devices[0].advertising);
    alert(this.devices[0].name);
    alert(this.devices[0].rssi);
    alert(this.devices[0].services[0]);
    alert(this.devices[0].characteristic_uuid);
    //this.ble.autoConnect('18:93:D7:46:B2:71', this.onConnected.bind(this), this.onDisconnected.bind(this));
  }

  onConnected(device) {
    alert('conectado a ' + device.id);
    alert('servs ' + device.services);/*
  alert('chars '+device.characteristics[0]);
  device.characteristics.forEach(element => {
      alert('s '+element.service+' c '+element.characteristic+' p '+element.properties);
  });
/*
  alert('s '+device.services);
  alert('s '+device.characteristics[3].service);
  alert('c '+device.characteristics[3].characteristic);
  alert('p '+device.characteristics[3].properties);
   //console.log(`Connected to ${device.id}`)l*/
  }

  onDisconnected(device) {
    alert('no conectado a ' + device.id);
    //console.log(`Disconnected from ${device.id}`)l
  }
  //this.ble.autoConnect(,alert(),alert('no conectado'));

  //this.ble.scan(['18:93:D7:46:B2:71'],15).subscribe(device => this.onDeviceDiscovered(device));

  //alert(this.ble.connectedPeripheralsWithServices);
  //alert(this.ble.scan([],5));

  start2() {
    var databuff = new Uint8Array(1);
    databuff[0] = 55;
    //alert('conectado');
    //this.mimi =this.ble.read('18:93:D7:46:B2:71','FEE7','FEC8 ').then(data=>{alert("data: "+bytes2String(data))}).catch(derra=>{alert("error es "+derra)});
    //this.mimi =this.ble.read('18:93:D7:46:B2:71','1801','2A05 ').then(data=>{alert("data: "+bytes2String(data))}).catch(derra=>{alert("error es "+derra)});
    this.mimi = this.ble.write('18:93:D7:46:B2:71', 'FFE0', 'FFE1', databuff.buffer).then(data => { alert("data: " + data) }).catch(derra => { alert("error es " + derra) });
    this.ble.startNotification('18:93:D7:46:B2:71', 'FFE0', 'FFE1').subscribe(buffer => {
      alert(String.fromCharCode.apply(null, new Uint8Array(buffer)))
    });
    this.mimi = this.ble.read('18:93:D7:46:B2:71', 'FFE0', 'FFE1').then(data => { alert("data: " + data) }).catch(derra => { alert("error es " + derra) });
    /*this.mimi =this.ble.read('18:93:D7:46:B2:71',"6E400001-B5A3-F393-E0A9-E50E24DCCA9E",'FEC9').then(data=>{alert("data: "+JSON.stringify(data))}).catch(derra=>{alert("error es "+derra)});
    //this.mimi =this.ble.read('18:93:D7:46:B2:71','1800','2A00').then(data=>{alert("data: "+bytes2String(data))}).catch(derra=>{alert("error es "+derra)});
    this.mimi =this.ble.read('18:93:D7:46:B2:71','1800','2A01').then(data=>{alert("data: "+bytes2String(data))}).catch(derra=>{alert("error es "+derra)});
    this.mimi =this.ble.read('18:93:D7:46:B2:71','1800','2A02').then(data=>{alert("data: "+bytes2String(data))}).catch(derra=>{alert("error es "+derra)});
    //this.mimi =this.ble.read('18:93:D7:46:B2:71','1800','2A03 ').then(data=>{alert("data: "+bytes2String(data))}).catch(derra=>{alert("error es "+derra)});
    this.mimi =this.ble.read('18:93:D7:46:B2:71','1800','2A04').then(data=>{alert("data: "+bytes2String(data))}).catch(derra=>{alert("error es "+derra)});
    function bytes2String(buffer) {    return String.fromCharCode.apply(null, new Uint8Array(buffer));}
    //alert(this.mimi.resolve());*/

    //this.mimi.then(alert());
    this.percent++;/*
  this.connect = function(device_id){
    this.ble.connect(
      device_id,
      function(res){
        $state.go('device', { 'id': device_id });
      },
      function(err){
        alert('Something went wrong while trying to connect. Please try again');
      }
    );
  
  //this.ble.connect('18:93:D7:46:B2:71',, alert("Scanning"));
  this.ble.connect('18:93:D7:46:B2:71',function (){alert("Connected?");});//.subscribe(peripheralData => {
 */ //alert("Connected?");
    /* },
     peripheralData => {
       alert("Not connected?");
     });*/
  }

  starttime() {
    this.counting = !this.counting;
    if (!this.counting) {
      this.stat = "Stop";
      this.myVar = setInterval(function myTimer() { this.elapsed++; }.bind(this), 1000);


    }
    if (this.counting) {
      this.stat = "Start";
      clearInterval(this.myVar);
      this.fullTime = Math.floor(this.elapsed + this.fullTime);
      this.elapsed = 0;
    }


    /*
        
        
      }
    
      */
    //this.fullTime++;
  }

  TimeRepeat() { }




  handy(res) {
    if (res.role === "Ok") {
      if ((res.data.values.ssid === "" || res.data.values.password === "")) {
        alert("Some fields are empty");
        this.presentAlertPrompt();
      }
      else {
        this.getServ.handleIncomingWIFI(res.data.values.ssid,res.data.values.password);
        alert("Data received");
      }
    }
  }


  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Wi-Fi Network data',
      inputs: [
        {
          name: 'ssid',
          type: 'text',
          placeholder: 'Network SSID'
        },
        {
          name: 'password',
          type: 'text',
          id: 'name2-id',
          placeholder: 'Network password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return true;
          }
        }, {
          text: 'Ok',
          role: 'Ok',
          handler: data => {
            console.log(data);
          }
        }
      ]
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
    this.handy(result);
  }










}
