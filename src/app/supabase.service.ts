import { Injectable } from '@angular/core'
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'
import {environment} from "../environments/environment";

export interface Profile {
  id?: string
  username: string
  website: string
  avatar_url: string
}

export interface Player {
  active: boolean | null
  age: number | null
  college: string | null
  experience: number | null
  first_name: string
  height: string | null
  height_feet: number | null
  height_inches: number | null
  id: number
  last_name: string
  long_name: string | null
  number: number | null
  position: string | null
  short_name: string | null
  sportsdata_player_id: number | null
  sportsdata_team_id: number | null
  status: string | null
  usa_today_headshot_link: string | null
  usa_today_headshot_link_nobg: string | null
  usa_today_player_id: number | null
  weight: string | null
  espn_id: number | null
  espn_headshot: string | null
}

export interface PlayerListRes{
  body: Player
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
    let supaClientRes = await this.supabaseClient
      .from(tableName)
      .select('*');

    if (supaClientRes.error){
      console.log(supaClientRes.error)
      return [];
    }

    return supaClientRes.data || []
  }

  async getPlayerByPosition(position: string): Promise<Player[]>{
    let supaClientRes = await this.supabaseClient
      .from('players')
      .select('*')
      .in('position', [position])
    ;

    if (supaClientRes.error){
      console.log(supaClientRes.error)
      return [];
    }

    return supaClientRes.data || []
  }

  async getOffensivePlayers(): Promise<Player[]>{
    let supaClientRes = await this.supabaseClient
      .from('players')
      .select('*')
      .in('position', ["RB", "WR", "QB", "TE"])
    ;

    if (supaClientRes.error){
      console.log(supaClientRes.error)
      return [];
    }

    return supaClientRes.data || []
  }

  async getIndividualPlayer(id: number): Promise<Player | null>{
    let supaClientRes = await this.supabaseClient
      .from('players')
      .select('*')
      .eq('id', id)
    ;

    if (supaClientRes.error){
      console.log(supaClientRes.error)
      return null;
    }

    return supaClientRes.data[0] || null
  }
}
