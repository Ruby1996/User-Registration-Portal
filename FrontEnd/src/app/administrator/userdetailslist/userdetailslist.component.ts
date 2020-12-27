import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/user.model';
import { UserdetailService } from 'src/app/shared/userdetail.service';

@Component({
  selector: 'app-userdetailslist',
  templateUrl: './userdetailslist.component.html',
  styleUrls: ['./userdetailslist.component.css']
})
export class UserdetailslistComponent implements OnInit {

  

  constructor(public service: UserdetailService, private toastr:ToastrService) { 
    
  }
  
  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(item:User){
   this.service.insertion=true;
   this.service.hidden2=false;
   this.service.hidden1=true;
   
   this.service.userData = Object.assign({},item);
  }

  onDelete(id){
    if(confirm("Are you sure you want to delete?"))
        this.service.deleteUserDetails(id).subscribe(res=>{
          this.service.refreshList();
          this.toastr.warning('Deleted Successfully','',{positionClass:'toast-custom'});

        },err=>{
          console.log(err)
        });
      }

      

}
