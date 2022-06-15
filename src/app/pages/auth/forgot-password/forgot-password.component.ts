import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  sentEmail: boolean = false;
  handleSendEmail = (): void => {
    this.sentEmail = !this.sentEmail;
  };

  constructor() { }

  ngOnInit(): void {
  }

}
