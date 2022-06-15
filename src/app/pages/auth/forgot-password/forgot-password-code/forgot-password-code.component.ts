import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-code',
  templateUrl: './forgot-password-code.component.html',
  styleUrls: ['./forgot-password-code.component.scss']
})
export class ForgotPasswordCodeComponent implements OnInit {
  @Output() onSendEmail = new EventEmitter();

  form: FormGroup = this.fb.group({
    code: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    // private authService: AuthService,
    // private router: Router,
  ) { }

  handleClick = (): void => {
    this.onSendEmail.emit();
   }

  ngOnInit(): void {
  }

}
