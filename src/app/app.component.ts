import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { SpinnerService } from '@services/spinner.service';
import { UrlService } from '@services/url.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'MAVEN Media Profiles';
  loading = false;
  previousUrl: string;
  currentUrl: string;
  constructor(
    public spinnerService: SpinnerService,
    private changeDetector: ChangeDetectorRef,
    private urlService: UrlService
  ) {}

  ngOnInit() {
    // Or subscribe to the previous url observable here
    this.urlService.previousUrl$.subscribe((previousUrl: string) => {
      this.previousUrl = previousUrl;
    });
  }
}
