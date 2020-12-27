import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserdetailService } from 'src/app/shared/userdetail.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {
  newUserDetails:any

  formModel={
   oldPassword :'',
   newPassword:'',
   confirmPassword:''
  }

  constructor(private service:UserdetailService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){

    if(form.value.newPassword == form.value.confirmPassword){
      
      this.service.getUserProfile().subscribe(res=>{

        this.newUserDetails = form.value;
        // this.newUserDetails.UserName =  this.userDetails.UserName;
        this.service.changePassword(this.newUserDetails).subscribe(res=>{

        

          this.toastr.success("Password changed successfully","",{positionClass:'toast-custom'});
          this.formModel.oldPassword='';
          this.formModel.newPassword='';
          this.formModel.confirmPassword='';
        }
          ,err=>{this.toastr.error('Invalid credentials','Authentication Failed',{positionClass:'toast-custom'});})

       
      }

        ,err=>{console.log(err)})
    }
    else
    this.toastr.error('Password Mismatch','Authentication Failed',{positionClass:'toast-custom'});

  }
}



