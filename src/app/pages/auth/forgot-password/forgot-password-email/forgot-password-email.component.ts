import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-email',
  templateUrl: './forgot-password-email.component.html',
  styleUrls: ['./forgot-password-email.component.scss']
})
export class ForgotPasswordEmailComponent implements OnInit {
  @Output() onSendEmail = new EventEmitter();

  form: UntypedFormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
  });

  constructor(
    private fb: UntypedFormBuilder,
    // private authService: AuthService,
    // private router: Router,
  ) { }

  handleClick = (): void => {
    this.onSendEmail.emit();
   }

  ngOnInit(): void {
  }

}
