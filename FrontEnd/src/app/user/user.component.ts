import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserdetailsComponent } from '../administrator/userdetails/userdetails.component';
import { UserdetailService } from '../shared/userdetail.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userDetails:any;
  user: any;
  check:boolean;
  

  constructor(private router:Router,private service:UserdetailService) { }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(res=>{
      this.userDetails = res;
    },
      
      err=>{console.log()});
  }

  OnLogout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')

  }

}
