import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/user.model';
import { UserdetailService } from 'src/app/shared/userdetail.service';

@Component({
  selector: 'app-userdetailslist',
  templateUrl: './userdetailslist.component.html',
  styleUrls: ['./userdetailslist.component.css']
})
export class UserdetailslistComponent implements OnInit {

  

  constructor(public service: UserdetailService, private toastr:ToastrService,private router:Router) { 
    
  }
  
  ngOnInit(): void {
    this.service.refresh();
  }

  displayDetails(item:User){
   this.service.insertion=true;
   this.service.hidden2=false;
   this.service.hidden1=true;
   this.router.navigateByUrl('/userProfileUpdate');
   this.service.userData = Object.assign({},item);
  }

  onDelete(id){
    if(confirm("Are you sure you want to delete?"))
        this.service.deleteUserDetails(id).subscribe(res=>{
          this.service.refresh();
          this.toastr.success('Deleted Successfully','',{positionClass:'toast-custom'});

        },err=>{
          console.log(err)
        });
      }

      

}
