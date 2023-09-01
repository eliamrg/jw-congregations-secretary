import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserAdmin();
  }

  constructor(private Auth: AuthService, private router:Router){}
  async checkUserAdmin(){
    let user:any;
    let uid:any
    try{

      await this.Auth.initialize();
      await this.Auth.getUserId().then(async uidDoc=>{
        uid=uidDoc;
       
      })
  
      await this.Auth.getFirestoreUser(uid).then((userDoc:any)=>{
        user=userDoc;
       
      })
      
      
      if(user.administrador){
        
        return true;
      }
      else{
        this.router.navigate(['notAllowed/Admin'])
        return false;
      }
    }
    catch(ex:any){
      this.router.navigate(['notAllowed/Admin'])
        return false;
    }
  }
  
}
  

