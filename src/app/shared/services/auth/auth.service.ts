import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import * as auth from 'firebase/auth';
import {User as FirebaseUser} from 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {User} from '@shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: FirebaseUser;

  public get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  public get isVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  public constructor(private readonly fireAuth: AngularFireAuth, private readonly fireStore: AngularFirestore, private readonly router: Router, private readonly ngZone: NgZone) {
    this.fireAuth.onIdTokenChanged((user: FirebaseUser) => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  public signIn(email: string, password: string): Promise<void> {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.updateUserData(result.user);

        this.fireAuth.authState.subscribe((user: FirebaseUser) => {
          if (user) {
            if (this.isVerified) {
              this.router.navigateByUrl('register');
            } else {
              this.router.navigate(['/']);
            }
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

  public signOut(): Promise<void> {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }

  public verifyEmail(oobCode: string): Promise<void> {
    return this.fireAuth.applyActionCode(oobCode);
  }

  public refreshUser(): void {
    this.fireAuth.currentUser.then((user: FirebaseUser) => {
      user.reload();
      user.getIdToken(true);
    });
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

  private sendVerificationMail() {
    return this.fireAuth.currentUser
      .then((user: any) => {
        const actionCodeSettings = {
          url: 'http://localhost:4200/verify', // Replace with your custom URL
          handleCodeInApp: true
        };
        return user.sendEmailVerification(actionCodeSettings);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  private updateUserData(user: firebase.default.User, updatedUser: User = {} as User): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      ...updatedUser
    };

    return userRef.set(data, {merge: true});
  }

  public setUserDetails(firstName: string, lastName: string, department: string, field: string, studentId: string, yearOfGraduation: string, phoneNumber: string): Promise<void> {
    const currentUser = this.fireAuth.currentUser;

    if (currentUser) {
      const updatedUser = {
        firstName,
        lastName,
        department,
        field,
        studentId,
        yearOfGraduation,
        phoneNumber,
        setDetails: true
      } as User;

      return currentUser
        .then((user) => {
          return this.updateUserData(user, updatedUser);
        })
        .catch((error) => {
          console.error('Error updating user profile:', error);
        });
    } else {
      console.error('No logged-in user found');
      return Promise.reject('No logged-in user found');
    }
  }
}
