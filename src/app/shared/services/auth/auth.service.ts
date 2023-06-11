import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import * as auth from 'firebase/auth';
import {User as firebaseUser} from 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs';
import {User} from '@shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User;

  public get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  public constructor(private readonly fireAuth: AngularFireAuth, private readonly fireStore: AngularFirestore, private readonly router: Router, private readonly ngZone: NgZone) {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  public signIn(email: string, password: string): Promise<void> {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.updateUserData(result.user);

        this.fireAuth.authState.subscribe((user: firebaseUser) => {
          if (user) {
            this.router.navigate(['/']);
          }
        });
      })
      .catch((error) => {
        alert(error['code']);
      });
  }

  public signUp(email: string, password: string): Promise<void> {
    return this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        this.updateUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  public googleSignIn(): Promise<void> {
    return this.authLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['/']);
    });
  }

  public signOut() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }

  public verifyEmail(oobCode: string): Promise<void> {
    return this.fireAuth.applyActionCode(oobCode);
  }

  private authLogin(provider: any): Promise<void> {
    return this.fireAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['/']);
        this.updateUserData(result.user);
      })
      .catch((error) => {
        alert(error['code']);
      });
  }

  // public async googleSignIn(): void {
  //   const provider = new auth.GoogleAuthProvider();
  //   const credential = await this.fireAuth.signInWithPopup(provider);
  //   return this.updateUserData(credential.user);
  // }

  private sendVerificationMail() {
    return this.fireAuth.currentUser
      .then((user: any) => {
        const actionCodeSettings = {
          url: 'http://localhost:4200/verify-email', // Replace with your custom URL
          handleCodeInApp: true
        };
        return user.sendEmailVerification(actionCodeSettings);
      })
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // private sendVerificationMail() {
  //   return this.fireAuth.currentUser
  //     .then((user: any) => user.sendEmailVerification())
  //     .then(() => {
  //       this.router.navigate(['verify-email-address']);
  //     });
  // }

  private updateUserData(user: firebaseUser): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };

    return userRef.set(data, {
      merge: true
    });
  }
}
