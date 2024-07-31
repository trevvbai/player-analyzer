import { Injectable } from '@angular/core'
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'
import {environment} from "../../environment";

export interface Profile {
  id?: string
  username: string
  website: string
  avatar_url: string
}

export interface Player {
  age: number;
  first_name: string
  id: number
  last_name: string
  position: string
  team_id: number | null
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseClient: SupabaseClient
  _getSession: AuthSession | null = null

  constructor() {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  get getSession() {
    this.supabaseClient.auth.getSession().then(({ data }) => {
      this._getSession = data.session
    })
    return this._getSession
  }

  profile(user: User) {
    return this.supabaseClient
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabaseClient.auth.onAuthStateChange(callback)
  }

  signIn(email: string) {
    return this.supabaseClient.auth.signInWithOtp({ email })
  }

  signOut() {
    return this.supabaseClient.auth.signOut()
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    }

    return this.supabaseClient.from('profiles').upsert(update)
  }

  downLoadImage(path: string) {
    return this.supabaseClient.storage.from('avatars').download(path)
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabaseClient.storage.from('avatars').upload(filePath, file)
  }


  async getTableData(tableName: string): Promise<Player[]>{

    var foo = await this.supabaseClient
      .from('players')
      .select('*');

    if (foo.error){
      console.log(foo.error)
      return [];
    }

    return foo.data || []
  }
}
