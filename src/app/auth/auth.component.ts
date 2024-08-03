import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms'
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


export class AuthComponent implements OnInit{
  signInForm! : FormGroup;
  loading = false

  constructor(
    private supabaseService: SupabaseService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ''
    })
  }

  async onSubmit(): Promise<void> {
    try {
      this.loading = true
      const email = this.signInForm.value.email as string
      const signInResponse = await this.supabaseService.signIn(email)

      //if the response has an error, throw error
      if (signInResponse.error) {
        throw signInResponse.error
      }

      alert('Check your email for the login link!')
    } catch (error) {

      //if the error was an error, alert the user
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.signInForm.reset()
      this.loading = false
    }
  }
}
