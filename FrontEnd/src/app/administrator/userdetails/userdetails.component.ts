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
    this.setUserData();
  }
  
  register(registerForm:NgForm){

    this.service.userData.Password = registerForm.value.UserName;

  var confirm = prompt("Confirm the password")

  if(confirm == this.service.userData.Password){

        this.service.postUserDetails().subscribe(res=>{

          registerForm.resetForm();
          
        this.toastr.success('Submitted Successfully','',{positionClass:'toast-custom'})
        this.service.refreshList();
        this.router.navigateByUrl('/registration');
        
        },
        err=>{
          console.log(err);
        })    
  }
  else{this.toastr.error('Password mismatch','',{positionClass:'toast-custom'})}  

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
