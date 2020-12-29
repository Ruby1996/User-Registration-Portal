import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { element } from 'protractor';


import {User} from './user.model';



@Injectable({
  providedIn: 'root'
})
export class UserdetailService {

  userData:User = new User(0,'','','','','',false);
  list : User[];
  insertion:boolean
  hidden1:boolean
  hidden2:boolean
  readonly rootUrl = 'http://localhost:63101/api';
  authToken: string;
  profileMode:boolean = true;
  editMode:boolean = false;

  constructor(private http: HttpClient) { }

  refresh(){
    this.http.get(this.rootUrl + '/Users' )
    .toPromise()
    .then(res => this.list = res as User[]);   
 
  }

 postUserDetails(){
   return this.http.post(this.rootUrl + '/Users' , this.userData)
 }

 putUserDetails(){
  return this.http.put(this.rootUrl + '/Users/' + this.userData.Id , this.userData)
}

deleteUserDetails(id){
  return this.http.delete(this.rootUrl + '/Users/' + id )
}

login(formData){
  return this.http.post(this.rootUrl + '/Users/Login' , formData )
}

getUserProfile(){
 var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
 return this.http.get(this.rootUrl + '/UserProfile',{headers : tokenHeader});


}

putUserProfile(userDetails){

  const profileUpdateModel={

    FirstName : userDetails.FirstName,
    LastName : userDetails.LastName,
    Email : userDetails.Email
   

  }
  var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
  return this.http.post(this.rootUrl + '/UserProfile/UpdateProfile/' ,profileUpdateModel ,{headers : tokenHeader} );
}

changePassword(newUserDetails){
 
  const resetPasswordViewModel={

    OldPassword : newUserDetails.oldPassword,
    NewPassword : newUserDetails.newPassword,
    ConfirmPassword : newUserDetails.confirmPassword
   

  }

  var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
  return this.http.post(this.rootUrl + '/UserProfile/ChangePassword',resetPasswordViewModel,{headers : tokenHeader});

}

roleMatch(allowedRoles): boolean{
  var isMatch = false;
  var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
  var userRole = payload.role;
  allowedRoles.forEach(element=>{
    if(userRole == element){
      isMatch = true;
      return false;
    }
  });
  return isMatch;

}

}