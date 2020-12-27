import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/user.model';
import { UserdetailsComponent } from '../administrator/userdetails/userdetails.component';
import { UserdetailService } from '../shared/userdetail.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
  // styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model:any={}
 
 formModel={
   UserName :'',
   Password:''
 }


  
  constructor(private router:Router, public service: UserdetailService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();

  }

  

  login(loginForm:NgForm){
    if(loginForm.value.UserName == "admin"){

      
      this.service.login(loginForm.value).subscribe(
      
        (res:any)=>{
           localStorage.setItem('token',res.token);
           this.router.navigateByUrl('/registration');
    
        }, 
          err=>{
            if(err.status == 400){
              this.toastr.error("Invalid Username/Password",'Authentication Failed',{positionClass:'toast-custom'})
            }
            else
            console.log(err)
          })

    }
    else{
        this.service.login(loginForm.value).subscribe(
          
        (res:any)=>{
          localStorage.setItem('token',res.token);
          this.router.navigateByUrl('/userProfile');

        }, 
          err=>{
            if(err.status == 400){
              this.toastr.error("Invalid Username/Password",'Authentication Failed',{positionClass:'toast-custom'})
            }
            else
            console.log(err)
          })
    }
  }

}
