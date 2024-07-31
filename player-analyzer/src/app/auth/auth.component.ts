import {Component} from '@angular/core'
import {FormBuilder, ReactiveFormsModule} from '@angular/forms'
import {SupabaseService} from '../supabase.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  imports: [
    ReactiveFormsModule
  ],
  standalone: true
})
export class AuthComponent {

  private readonly supabaseService: SupabaseService = new SupabaseService()
  private readonly formBuilder: FormBuilder = new FormBuilder()

  loading = false

  signInForm = this.formBuilder.group({
    email: '',
  })

  async onSubmit(): Promise<void> {

    try {
      this.loading = true
      const email = this.signInForm.value.email as string
      const {error} = await this.supabaseService.signIn(email)

      if (error) {
        throw error
      }

      alert('Check your email for the login link!')
    } catch (error) {

      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {

      this.signInForm.reset()
      this.loading = false
    }
  }
}
