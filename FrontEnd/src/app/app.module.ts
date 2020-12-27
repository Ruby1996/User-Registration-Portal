import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { UserdetailsComponent } from './administrator/userdetails/userdetails.component';
import { UserdetailslistComponent } from './administrator/userdetailslist/userdetailslist.component';
import { LoginComponent } from './login/login.component';
import { from } from 'rxjs';
import { UserdetailService } from './shared/userdetail.service';
import { UserComponent } from './user/user.component';
import { UserSettingsComponent } from './user/user-settings/user-settings.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { RegistrationComponent } from './administrator/registration/registration.component';
import { AdminSettingsComponent } from './administrator/admin-settings/admin-settings.component';


@NgModule({
  declarations: [
    AppComponent,
    AdministratorComponent,
    UserdetailsComponent,
    UserdetailslistComponent,
    LoginComponent,
    UserComponent,
    UserSettingsComponent,
    UserProfileComponent,
    RegistrationComponent,
    AdminSettingsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({timeOut:1000, preventDuplicates: true})
  ],
  providers: [UserdetailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
