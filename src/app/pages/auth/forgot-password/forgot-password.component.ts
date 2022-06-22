import { Component, OnInit } from '@angular/core';
import { NextStepData } from 'src/app/core/models/auth.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  sentEmail: boolean = false;
  email: string;
  handleSendEmail = (value: NextStepData): void => {
    this.sentEmail = value.status;
    this.email = value.email;
  };

  constructor() { }

  ngOnInit(): void {
  }

}
