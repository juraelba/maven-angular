import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from '../../../core/services/toastr.service';
import { SpinnerService } from '../../../core/services/spinner.service';
import { CustomValidator, PasswordNumberValidator, PasswordUpperValidator } from '../../../core/utils/validators.util';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  sentFormData: boolean = false;
  dataForm: UntypedFormGroup = this.fb.group({
    email: ['', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [
        this.customValidator.existingEmailValidator(),
        this.customValidator.domainValidator()
      ]
    }],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      PasswordNumberValidator(),
      PasswordUpperValidator()
    ]],
    name: ['', Validators.required],
    title: [''],
    office: ['', Validators.required],
    phone: ['', Validators.required],
    terms: ['', Validators.required],
    // captcha: ['', Validators.required],
  });
  codeForm: UntypedFormGroup = this.fb.group({
    code: ['', Validators.required],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private spinnerService: SpinnerService,
    private customValidator: CustomValidator,
  ) { }

  ngOnInit(): void {
  }

  async signup() {
    try {
      this.spinnerService.show();
      const value = this.dataForm.value;
      // await this.authService.signup('first name', 'last name', value.email, value.password, value.invitees).toPromise();
      // this.router.navigate(['/']);
      this.sentFormData = true;
    } catch (e: any) {
      this.toastr.danger(e.message);
    } finally {
      this.spinnerService.hide();
    }
  }
}
