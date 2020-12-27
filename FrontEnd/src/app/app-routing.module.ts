import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth/auth.guard';
import { UserSettingsComponent } from './user/user-settings/user-settings.component';
import { UserdetailsComponent } from './administrator/userdetails/userdetails.component';
import { RegistrationComponent } from './administrator/registration/registration.component';
import { AdminSettingsComponent } from './administrator/admin-settings/admin-settings.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

const routes: Routes = [

  {path:'',component:LoginComponent},
  {path:'administrator',component:AdministratorComponent,canActivate:[AuthGuard]},
  {path:'registration',component:RegistrationComponent,canActivate:[AuthGuard]},
  {path:'user',component:UserComponent,canActivate:[AuthGuard]},
  {path:'userProfile',component:UserProfileComponent,canActivate:[AuthGuard]},
  {path:'changePassword',component:UserSettingsComponent,canActivate:[AuthGuard]},
  {path:'adminChangePassword',component:AdminSettingsComponent,canActivate:[AuthGuard]},
  {path:'logout',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
