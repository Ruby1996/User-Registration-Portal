import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  isActive:any
  constructor(private router:Router) { }

  ngOnInit(): void {
  this.isActive = true;
  }
  OnLogout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('')

  }

}
