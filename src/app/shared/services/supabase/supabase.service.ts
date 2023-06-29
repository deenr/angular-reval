import {Injectable} from '@angular/core';
import {SphienceUser} from '@shared/interfaces/user/sphience-user';
import {
  AuthChangeEvent,
  AuthError,
  AuthOtpResponse,
  AuthResponse,
  AuthSession,
  AuthTokenResponse,
  ResendParams,
  Session,
  SignInWithPasswordCredentials,
  Subscription,
  SupabaseClient,
  User,
  VerifyEmailOtpParams,
  VerifyOtpParams,
  createClient
} from '@supabase/supabase-js';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public _session: AuthSession | null = null;
  private readonly supabase: SupabaseClient;

  public constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  public get session(): AuthSession {
    this.supabase.auth.getSession().then(({data}) => {
      this._session = data.session;
    });
    return this._session;
  }

  public profile(user: User) {
    return this.supabase.from('profiles').select(`username, website, avatar_url`).eq('id', user.id).single();
  }

  public authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void): {data: {subscription: Subscription}} {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  public signIn(email: string, password: string): Promise<AuthTokenResponse> {
    return this.supabase.auth.signInWithPassword({email, password});
  }

  public signUp(email: string, password: string): Promise<AuthResponse> {
    return this.supabase.auth.signUp({email, password});
  }

  public signOut(): Promise<{error: AuthError}> {
    return this.supabase.auth.signOut();
  }

  public verifyEmail(token: string, email: string): Promise<AuthResponse> {
    const params = {token, email, type: 'email'} as VerifyEmailOtpParams;
    return this.supabase.auth.verifyOtp(params);
  }

  public resendEmailVerification(email: string): Promise<AuthOtpResponse> {
    const params = {email, type: 'signup'} as ResendParams;
    return this.supabase.auth.resend(params);
  }

  public updateProfile(profile: SphienceUser) {
    const update = {
      ...profile,
      updated_at: new Date()
    };

    return this.supabase.from('profiles').upsert(update);
  }
}
