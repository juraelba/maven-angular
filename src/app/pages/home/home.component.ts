import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'ramda';
import { forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { ListsService } from '../../core/services/lists/lists.service';
import { ListsData, ListInfo } from '../../core/models/list.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  shouldRender: boolean = false;

  constructor(
    private localStorage: LocalStorageService,
    private listsService: ListsService,
  ) { }

  ngOnInit(): void {
    this.updateCache();
  }

  fetchLists(listsCahingInformation: ListInfo[], indexDBEmail: string) {
    const storedEmail = this.localStorage.getUserEmail();
    const initialCachingTime = this.localStorage.getListCachingTime();
    const optionsToUpdate = this.listsService.getListOptionsInfomationToFetch(listsCahingInformation, initialCachingTime);

    this.localStorage.storeListsCahingInformation(listsCahingInformation);

    if(indexDBEmail === storedEmail && isEmpty(optionsToUpdate)) {
      return of({});
    }

    return indexDBEmail === storedEmail 
      ? this.listsService.fetchListOptions(optionsToUpdate)
      : this.listsService.fetchListOptions(listsCahingInformation);
  }

  updateCache(): void {
    forkJoin({
      indexDBEmail: this.localStorage.getIndexDBEmail(),
      listsCahingInformation: this.listsService.fetchListsCachingInformation()
    })
      .pipe(
        switchMap(({ listsCahingInformation, indexDBEmail }: { listsCahingInformation: ListInfo[], indexDBEmail: string }) => {
          return this.fetchLists(listsCahingInformation, indexDBEmail)
        }),
        switchMap((listsOptions: ListsData) => {
          return this.localStorage.getCachedOptionsFromIndexDB()
            .pipe(
              map((chachedOptions: ListsData) => ({ ...chachedOptions, ...listsOptions }))
            );
        }),
        switchMap((listsOptions: ListsData) => {
          const storedEmail = this.localStorage.getUserEmail();
  
          return forkJoin({
            isUserEmailStorade: this.localStorage.setIndexDBEmail(storedEmail),
            isOptionsStored: this.localStorage.storeIndexDBListOptions(listsOptions)
          })
        })
      )
      .subscribe(() => {
        this.shouldRender = true;
        this.localStorage.setListCahingTime();
      });
  }
}
