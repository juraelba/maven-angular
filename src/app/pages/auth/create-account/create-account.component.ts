import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  isLoading: boolean = false;
  form: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    name: ['', Validators.required],
    title: ['', Validators.required],
    office: ['', Validators.required],
    phone: ['', Validators.required],
    terms: ['', Validators.required],
    captcha: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    // private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async signup() {
    try {
      this.isLoading = true;
      const value = this.form.value;
      // await this.authService.signup('first name', 'last name', value.email, value.password, value.invitees).toPromise();
      this.router.navigate(['/']);
    } catch (e) {
    } finally {
      this.isLoading = false;
    }
  }

}
