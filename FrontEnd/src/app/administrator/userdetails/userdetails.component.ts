import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { UserdetailService } from 'src/app/shared/userdetail.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 

  constructor( public service: UserdetailService, private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
  this.service.hidden1=false
  this.service.hidden2=true

  }
  
  register(registerForm:NgForm){

    this.service.userData.Password = registerForm.value.UserName
    

if(this.service.userData.Id == 0){

  var confirm = prompt("Confirm the password")

  if(confirm == this.service.userData.Password){

        this.service.postUserDetails().subscribe(res=>{
          
          this.setUserData();

          registerForm.resetForm();
          
        this.toastr.success('Submitted Successfully','',{positionClass:'toast-custom'})
        this.service.refreshList();
        
        },
        err=>{
          console.log(err);
        })    
  }
  else{this.toastr.error('Password mismatch','',{positionClass:'toast-custom'})}  

      }
    else{
    
      this.service.putUserDetails().subscribe(res=>{
        
       this.setUserData();

          registerForm.resetForm();
        this.toastr.success('Successfully Updated','',{positionClass:'toast-custom'})
        this.service.refreshList();
        this.service.insertion=false
        this.service.hidden1=false
        this.service.hidden2=true
        
        },
        err=>{
          console.log(err);
        }) 

    }  
  }

  setUserData(){
    this.service.userData={
      Id:0,
      FirstName:'',
      LastName:'',
      Email:'',
      UserName:'',
      Password:'',
      SuperUser:false
    }  

  }

}
