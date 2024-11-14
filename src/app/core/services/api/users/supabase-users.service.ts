import { Injectable } from '@angular/core';
import { UserStatus } from '@shared/models/user/enums/user-status.enum';
import { User, UserOverview, UserUnsensitive } from '@shared/models/user/interfaces/user.interface';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { SupabaseService } from '../supabase.service';
import { UserDTO, UserOverviewDTO, UserUnsensitiveDTO } from './dto/users.dto';
import { Users } from './users.interface';

@Injectable({
  providedIn: 'root'
})
export class SupabaseUsersService extends SupabaseService implements Users {
  public getAll(): Observable<User[]> {
    return from(
      this.supabase
        .from('users')
        .select(
          `
          id,
          firstName,
          lastName,
          email,
          phoneNumber,
          joined,
          users_role_status(role,status)
        `
        )
        .then(({ data }: { data: UserDTO[] }) => data?.map((userDTO: UserDTO) => this.mapUserDTOToUser(userDTO)))
    );
  }

  public getOverview(): Observable<UserOverview[]> {
    return from(
      this.supabase
        .from('users')
        .select(
          `
          id,
          firstName,
          lastName,
          email,
          joined,
          users_role_status(role,status)
        `
        )
        .then(({ data }: { data: UserOverviewDTO[] }) => data?.map((userDTO: UserOverviewDTO) => this.mapUserOverviewDTOToUserOverview(userDTO)))
    );
  }

  public getAllUnsensitive(): Observable<UserUnsensitive[]> {
    return from(
      this.supabase
        .from('users')
        .select(
          `
          id,
          firstName,
          lastName
        `
        )
        .not('firstName', 'eq', null)
        .not('lastName', 'eq', null)
        .then(({ data }: { data: UserUnsensitive[] }) => data?.map((userDTO: UserUnsensitive) => this.mapUserUnsensitiveDTOToUserUnsensitive(userDTO)))
    );
  }

  public getById(id: string): Observable<User> {
    return from(
      this.supabase
        .from('users')
        .select(
          `
          id,
          firstName,
          lastName,
          email,
          phoneNumber,
          joined,
          users_role_status(role,status)
        `
        )
        .eq('id', id)
        .single()
        .then(({ data }: { data: UserDTO }) => this.mapUserDTOToUser(data))
    );
  }

  public add(user: User): Observable<string> {
    const { role, status } = { ...user };
    delete user.role;
    delete user.status;

    return from(
      this.supabase
        .from('users')
        .insert({
          id: user.id,
          ...user
        })
        .select()
        .single()
    ).pipe(
      switchMap(({ data, error }) => {
        if (error) throw error;

        if (role || status) {
          return from(
            this.supabase
              .from('users_role_status')
              .update({
                role,
                status
              })
              .eq('user_id', user.id)
          ).pipe(
            map(({ error: roleError }) => {
              if (roleError) throw roleError;
              return data;
            })
          );
        }

        return of(data);
      }),
      map((data) => data.id)
    );
  }

  public update(user: Partial<User>): Observable<string> {
    const { role, status } = { ...user };
    delete user.role;
    delete user.status;

    return from(
      this.supabase
        .from('users')
        .upsert({
          id: user.id,
          ...user
        })
        .select()
        .single()
    ).pipe(
      switchMap(({ data, error }) => {
        if (error) throw error;

        if (role || status) {
          return from(
            this.supabase
              .from('users_role_status')
              .update({
                role,
                status
              })
              .eq('user_id', user.id)
          ).pipe(
            map(({ error: roleError }) => {
              if (roleError) throw roleError;
              return data;
            })
          );
        }

        return of(data);
      }),
      map((data) => data.id)
    );
  }

  public updateStatus(id: string, status: UserStatus): Observable<string> {
    return from(
      this.supabase
        .from('users_role_status')
        .update({
          status
        })
        .eq('user_id', id)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data;
      })
    );
  }

  public delete(id: string): Observable<string> {
    return from(
      this.supabase
        .from('users_role_status')
        .delete()
        .eq('user_id', id)
        .then(async () => {
          return this.supabase
            .from('users')
            .delete()
            .eq('id', id)
            .then(() => id);
        })
    );
  }

  private mapUserDTOToUser(userDTO: UserDTO): User {
    const { id, firstName, lastName, email, joined, phoneNumber, users_role_status } = userDTO;
    const { role, status } = users_role_status[0];

    return { id, firstName, lastName, email, role, status, joined, phoneNumber } as User;
  }

  private mapUserOverviewDTOToUserOverview(userDTO: UserOverviewDTO): UserOverview {
    const { id, firstName, lastName, email, joined, users_role_status } = userDTO;
    const { role, status } = users_role_status[0];

    return { id, firstName, lastName, email, role, status, joined } as UserOverview;
  }

  private mapUserUnsensitiveDTOToUserUnsensitive(userDTO: UserUnsensitiveDTO): UserUnsensitive {
    const { id, firstName, lastName } = userDTO;

    return { id, firstName, lastName } as UserUnsensitive;
  }
}
