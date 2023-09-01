import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';
import { Auth, getAuth, sendPasswordResetEmail } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/Firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdmitedGuard implements CanActivate {
  
  constructor (private Auth: AuthService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserAdmited();
  }

  async checkUserAdmited(){
    let user:any;
    let uid:any
    try{

      await this.Auth.initialize();
      await this.Auth.getUserId().then(async uidDoc=>{
        uid=uidDoc;
                
      })
  
      await this.Auth.getFirestoreUser(uid).then((userDoc:any)=>{
        user=userDoc;
        //console.log(userDoc)
      })
      
      if(user.admited){
        
        return true;
      }
      else{
        this.router.navigate(['notAllowed/Admited'])
        return false;
      }
    }
    catch(ex:any){
      this.router.navigate(['notAllowed/Admited'])
        return false;
    }
    
    

    
    //return true;
  }
  
}
