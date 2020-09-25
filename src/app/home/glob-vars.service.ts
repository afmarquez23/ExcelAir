import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';

@Injectable({
  providedIn: 'root'
})
export class GlobVarsService {

  entero: number = 78;
  temp: any;
  Variables = ["0", "0", "0", "0", "0", "0", "0", "0"]; //V I T1 T2 P1 P2 RH1 RH2
  ArduinoString: string = "";
  SSID: string = "";
  Pass: string = "";
  BLEdevices: any[] = [];
  Blestatus:string="None connected";
  Wifistatus:string="Not connected";
  constructor(private ble: BLE) { }
  currentBleStatus(name,id){
    if(name==""){
      this.Blestatus="None connected"
    }
    else{
      this.Blestatus="Connected to "+name;
    }
  }
  getCurrentBleStatus(){
    return this.Blestatus;
  }
  
  addnumber() {
    this.entero++;
    return this.entero;
  }
  subnumber() {
    this.entero--;
    return this.entero;
  }
  getnumber() {
    return this.entero;
  }
  setNumber(input) {
    this.entero = input;
  }
  setBLEArray(devices) {
    this.BLEdevices = devices;
  }
  getBLEArray() {
    return this.BLEdevices;
  }

  getVariables() {
    return this.Variables;
  }
  handleIncomingWIFI(newSSID: string, newPass: string) {
    this.SSID = newSSID;
    this.Pass = newPass;

  }



  handleIncomingBLE(id,incoming: string) {


    //databuff[0]=55;
    //alert(id);
    //alert(id.length);
    if (incoming.startsWith("]")) {
      this.ArduinoString = "," + this.SSID + "{" + this.Pass + "|";
      var databuff = stringToBytes(this.ArduinoString);
      this.ble.write(id, 'FFE0', 'FFE1', databuff).then(data => { /*alert("data: " + data)*/ }).catch(derra => { /*alert("error es " + derra)*/ });
      //alert(this.ArduinoString);
    }
    if (incoming.startsWith("S")) {
      
      //alert(incoming);

      this.Variables[0]=incoming.substring(1, incoming.indexOf("&"));
      //alert("V "+this.Variables[0]);
      incoming=incoming.substring(incoming.indexOf("&")+1);
      //alert(incoming);

      this.Variables[1]=incoming.substring(0, incoming.indexOf("&"));
      //alert("I "+this.Variables[1]);
      incoming=incoming.substring(incoming.indexOf("&")+1);
      //alert(incoming);

      this.Variables[2]=incoming.substring(0, incoming.indexOf("&"));
      //alert("T1 "+this.Variables[2]);
      incoming=incoming.substring(incoming.indexOf("&")+1);
      //alert(incoming);

      this.Variables[3]=incoming.substring(0, incoming.indexOf("F"));
      //alert("T2 "+this.Variables[3]);
    }


    if (incoming.startsWith("M")) {
      
      //alert(incoming);

      this.Variables[4]=incoming.substring(1, incoming.indexOf("&"));
      //alert("P1 "+this.Variables[4]);
      incoming=incoming.substring(incoming.indexOf("&")+1);
      //alert(incoming);

      this.Variables[5]=incoming.substring(0, incoming.indexOf("&"));
      //alert("P2 "+this.Variables[5]);
      incoming=incoming.substring(incoming.indexOf("&")+1);
      //alert(incoming);

      this.Variables[6]=incoming.substring(0, incoming.indexOf("&"));
      //alert("RH1 "+this.Variables[6]);
      incoming=incoming.substring(incoming.indexOf("&")+1);
      //alert(incoming);

      this.Variables[7]=incoming.substring(0, incoming.indexOf("F"));
      //alert("RH2 "+this.Variables[7]);
    }

    if (incoming.startsWith("%")) {
      this.Wifistatus="Not connected";
    }
    if (incoming.startsWith("#")) {
      this.Wifistatus="Connected to "+incoming.substring(1);
    }
    if (incoming.startsWith("&")) {
      this.Wifistatus="Connecting to "+incoming.substring(1);
    }


    /*alert(incoming);
    alert(incoming.length);
    alert(typeof (incoming));*/
    this.temp = incoming;
  }
  
  getCurrentWifiStatus(){
    return this.Wifistatus;
  }

}
function stringToBytes(string) {
  var array = new Uint8Array(string.length);
  for (var i = 0, l = string.length; i < l; i++) {
    array[i] = string.charCodeAt(i);
  }
  return array.buffer;
}
