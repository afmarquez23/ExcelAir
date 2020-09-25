import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobVarsService } from '../glob-vars.service';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.page.html',
  styleUrls: ['./measurements.page.scss'],
})
export class MeasurementsPage implements OnInit {
  
  variables:string[]=[];
  temp1:any=0;
  temp2:any=0;
  volt:any=0;
  curr:any=0;
  pres1:any=0;
  pres2:any=0;
  humi1:any=0;
  humi2:any=0;
  
  constructor(private router:Router, private getServ:GlobVarsService) { }
  
  home(){this.router.navigate(['home'])}
  //reload(){this.temp1=this.getServ.getTemp();}
  ngOnInit() {
    setInterval(
      function myTimer() {
        this.variables=this.getServ.getVariables();
      }.bind(this), 1000);
    //alert("heyo");
  }
  ionViewWillEnter(){
    
  }

}
