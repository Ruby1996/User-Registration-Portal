import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserdetailService } from 'src/app/shared/userdetail.service';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.css']
})
export class UserProfileUpdateComponent implements OnInit {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  constructor(public service:UserdetailService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }

  update(updateForm:NgForm){
    this.service.putUserDetails().subscribe(res=>{
        
     
      this.toastr.success('Successfully Updated','',{positionClass:'toast-custom'})
       
       this.service.refreshList();
       this.router.navigateByUrl('/registration');
       
       
       },
       err=>{
         console.log(err);
       }) 
  }
}
