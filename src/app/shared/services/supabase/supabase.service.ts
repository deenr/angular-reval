import {Injectable} from '@angular/core';
import {SphienceUser} from '@shared/interfaces/user/sphience-user';
import {
  AuthChangeEvent,
  AuthError,
  AuthOtpResponse,
  AuthResponse,
  AuthSession,
  AuthTokenResponse,
  OAuthResponse,
  ResendParams,
  Session,
  Subscription,
  User,
  VerifyEmailOtpParams,
  createClient
} from '@supabase/supabase-js';
import {environment} from 'src/environments/environment';

export const supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public _session: AuthSession | null = null;

  public get session(): AuthSession {
    supabase.auth.getSession().then(({data}) => {
      this._session = data.session;
    });
    return this._session;
  }

  public profile(user: User) {
    return supabase.from('profiles').select(`username, website, avatar_url`).eq('id', user.id).single();
  }

  public authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void): {data: {subscription: Subscription}} {
    return supabase.auth.onAuthStateChange(callback);
  }

  public signIn(email: string, password: string): Promise<AuthTokenResponse> {
    return supabase.auth.signInWithPassword({email, password});
  }

  public googleSignIn(): Promise<OAuthResponse> {
    return supabase.auth.signInWithOAuth({provider: 'google', options: {redirectTo: 'http://localhost:4200/register'}});
  }

  public signUp(email: string, password: string): Promise<AuthResponse> {
    return supabase.auth.signUp({email, password});
  }

  public signOut(): Promise<{error: AuthError}> {
    return supabase.auth.signOut();
  }

  public verifyEmail(token: string, email: string): Promise<AuthResponse> {
    const params = {token, email, type: 'email'} as VerifyEmailOtpParams;
    return supabase.auth.verifyOtp(params);
  }

  public resendEmailVerification(email: string): Promise<AuthOtpResponse> {
    const params = {email, type: 'signup'} as ResendParams;
    return supabase.auth.resend(params);
  }

  public updateProfile(profile: SphienceUser) {
    const update = {
      ...profile,
      updated_at: new Date()
    };

    return supabase.from('profiles').upsert(update);
  }
}
