import { from } from "rxjs";
import {tick} from '@angular/core/testing';

export class User {

    Id :number; 
    FirstName :string;
    LastName :string;
    Email :string;
    UserName :string;
    Password :string;
    SuperUser :boolean;

    constructor(id:number,firstname:string,lastname:string,email:string,username:string,password:string,superuser:boolean){
        this.Id=id;
        this.FirstName=firstname;
        this.LastName=lastname;
        this.Email=email;
        this.UserName=username;
        this.Password=password;
    }
}
