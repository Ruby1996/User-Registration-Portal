import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { profile } from 'console';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/user.model';
import { UserdetailService } from 'src/app/shared/userdetail.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetails:any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  
  constructor(public service:UserdetailService,private toastr:ToastrService) { }

  ngOnInit(): void {

    this.service.profileMode=true;
    this.service.editMode=false;
    this.getProfile();
  }

  enableEdit(){
    this.service.profileMode = false;
    this.service.editMode=true;
  }

  cancleUpdation(){

    if(confirm("Are you sure you want to cancel the changes?")){

    this.service.profileMode = true;
    this.service.editMode= false;
    this.getProfile();
    
   
    }
    

  }

 

  editProfile(profileForm:NgForm){

    this.userDetails = profileForm.value;
    this.service.putUserProfile(this.userDetails).subscribe(res=>{

      this.toastr.success("Successfully Updated","",{positionClass:'toast-custom'});
      this.service.profileMode = true;
      this.service.editMode= false;
      this.getProfile();
      profileForm.resetForm();
       

    },
    err=>{console.log(err)});

    
  }

  getProfile(){
    this.service.getUserProfile().subscribe(res=>{
      this.userDetails = res;
   
      this.service.userData.FirstName =this.userDetails.FirstName;
      this.service.userData.LastName =this.userDetails.LastName;
      this.service.userData.Email =this.userDetails.Email;
      this.service.userData.UserName =this.userDetails.UserName;
     
 
    },
      
      err=>{console.log()});

  }

}
