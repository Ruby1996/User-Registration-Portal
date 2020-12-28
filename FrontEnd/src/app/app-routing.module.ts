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
import { UserProfileUpdateComponent } from './administrator/user-profile-update/user-profile-update.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

const routes: Routes = [

  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'administrator',component:AdministratorComponent,canActivate:[AuthGuard],data:{permittedRoles:['Admin']}},
  {path:'registration',component:RegistrationComponent,canActivate:[AuthGuard],data:{permittedRoles:['Admin']}},
  {path:'userRegistration',component:UserdetailsComponent,canActivate:[AuthGuard],data:{permittedRoles:['Admin']}},
  {path:'userProfileUpdate',component:UserProfileUpdateComponent,canActivate:[AuthGuard],data:{permittedRoles:['Admin']}},

  {path:'forbidden',component:ForbiddenComponent},
  
  {path:'user',component:UserComponent,canActivate:[AuthGuard],data:{permittedRoles:['User']}},
  {path:'userProfile',component:UserProfileComponent,canActivate:[AuthGuard],data:{permittedRoles:['User']}},
  {path:'changePassword',component:UserSettingsComponent,canActivate:[AuthGuard],data:{permittedRoles:['User']}},
  {path:'adminChangePassword',component:AdminSettingsComponent,canActivate:[AuthGuard],data:{permittedRoles:['Admin']}},
  {path:'logout',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
