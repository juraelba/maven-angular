import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PasswordNumberValidator, PasswordUpperValidator, ConfirmPasswordValidator } from 'src/app/core/utils/validators.util';
import { AuthService } from 'src/app/core/services/auth.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { ChangePassword } from 'src/app/core/models/auth.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  token: string;
  checkTokenValid: boolean = false;

  public form: UntypedFormGroup;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getToken();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  getToken() {
    this.route.paramMap.subscribe(params => {
      if (params.has('token')) {
        let getToken = params.get('token');
        if (getToken) {
          this.token = getToken;
        }
      };
      this.buildForm();
      this.checkToken();
    });
  }

  buildForm() {
    const passwordValidators = [
      Validators.required,
      Validators.minLength(8),
      PasswordNumberValidator(),
      PasswordUpperValidator()
    ];

    const confirmValidator = [
      Validators.required
    ]

    this.form = new UntypedFormGroup({
      password: new UntypedFormControl('', passwordValidators),
      confirm: new UntypedFormControl('', confirmValidator),
    }, { validators: ConfirmPasswordValidator });
  }

  async checkToken() {
    try {
      this.spinnerService.show();
      if (this.token) {
        this.authService.checkToken(this.token).pipe(
          takeUntil(this.unsubscribeAll)
        ).subscribe(res => {
          this.checkTokenValid = res;
        });
      } else {
        this.checkTokenValid = false;
      }
    } catch (e: any) {
      this.toastr.danger(e.message);
    } finally {
      this.spinnerService.hide();
    }
  }

  async onSubmit() {
    try {
      this.spinnerService.show();
      if (this.form.value && this.form.value.password) {
        this.authService.updatePassword(new ChangePassword(this.token, this.form.value.password)).pipe(
          takeUntil(this.unsubscribeAll)
        ).subscribe(res => {
          if (res && res.length > 0) {
            this.toastr.success("Password updated successfully!");
            this.router.navigateByUrl('/login');
          }
        });
      }
    } catch (e: any) {
      this.toastr.danger(e.message);
    } finally {
      this.spinnerService.hide();
    }
  }

  get formControls() {
    return this.form.controls;
  }
}
