import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewChecked {
  title = 'MAVEN Media Profiles';
  loading = false;
  constructor(
    public spinnerService: SpinnerService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }
}
