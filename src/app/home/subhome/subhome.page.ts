import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobVarsService } from '../glob-vars.service';
@Component({
  selector: 'app-subhome',
  templateUrl: './subhome.page.html',
  styleUrls: ['./subhome.page.scss'],
})
export class SubhomePage implements OnInit {
  

  constructor(private router:Router, private getServ:GlobVarsService) { }
  entero:number=this.getServ.getnumber();
  ngOnInit() {
    
    
  }
  Home(){
    
    this.router.navigate(['home'])}

}
