import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { GlobVarsService } from '../glob-vars.service';
import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-bledevices',
  templateUrl: './bledevices.page.html',
  styleUrls: ['./bledevices.page.scss'],
})
export class BledevicesPage implements OnInit {
  BLEdevices:any[]=[];
  mimi:any;
  state:boolean=false;
  constructor(private ble:BLE, private router:Router, private ngZone:NgZone, private getServ:GlobVarsService) { }
  
  home(){this.router.navigate(['home'])}
  load(){
    alert(this.BLEdevices[0].id);
  }
  Scan(){
    //this.ble.startStateNotifications().then();
    this.ble.isEnabled().catch(error=>{alert(error);this.ble.enable();});
    this.BLEdevices=[];
    this.ble.stopScan();
    this.ble.startScan([]).subscribe(device => this.onDeviceDiscovered(device));
    //this.ble.scan([],5).subscribe(device => this.onDeviceDiscovered(device));
  }
  onDeviceDiscovered(device){
    this.ngZone.run(()=>{
      this.BLEdevices.push(device)
    })
  }
  Connect(i){
    
    alert('Connecting to '+this.BLEdevices[i].name+'\n'+'ID: '+this.BLEdevices[i].id);
    setTimeout(function myTimer() { 
      if(this.state===false)
      {
        alert('Could not connect to device'); 
      }
    }.bind(this), 5000);
    this.ble.autoConnect(this.BLEdevices[i].id, this.onConnected.bind(this), this.onDisconnected.bind(this));
  }
  onConnected(device) {
    alert('Connected to '+device.name+'\n'+'ID: '+device.id);
    this.getServ.currentBleStatus(device.name,device.id);
    this.state=true;
    //alert('servs '+device.services);
    this.Start(device);
   }
  
   onDisconnected(device) {
    alert(device.name+' disconnected \n'+'ID: '+device.id);
    this.state=false;
    this.getServ.currentBleStatus("","");
   }
   
  ionViewWillEnter(){
    this.BLEdevices=[];
    this.ble.stopScan();
  }
   Start(deviceConnected){
    //var databuff=new Uint8Array(1);
    //databuff[0]=55;
    //this.mimi =this.ble.write('18:93:D7:46:B2:71','FFE0','FFE1',databuff.buffer).then(data=>{alert("data: "+data)}).catch(derra=>{alert("error es "+derra)});
    this.ble.startNotification(deviceConnected.id,'FFE0','FFE1').subscribe(buffer => {
      this.getServ.handleIncomingBLE(deviceConnected.id,String.fromCharCode.apply(null, new Uint8Array(buffer)))});
      
    //.mimi =this.ble.read('18:93:D7:46:B2:71','FFE0','FFE1').then(data=>{alert("data: "+data)}).catch(derra=>{alert("error es "+derra)});
  }
  ionViewWillLeave(){
    this.ble.stopScan();
  }
  ngOnInit() {
  }
  ngOnDestroy(){
  }

}

