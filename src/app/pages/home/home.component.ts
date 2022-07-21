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
    /*
    * * STEP 1: Get stored email from index DB (needs to identify if user is a new) and fetch list information about options modified date.
        Using forkJoin methods we are passing Observables as an object and the utput will be same object with values equal to emited values from each stream.
        Each item should emit at least one value, if not next step will not start
    * * STEP 2: Using switchMap to cancel previous subsciption and create a new Observable that will fetch list options
        based on the information about user and lists modifiedDates information identify which list of options should be updated.
        For example: if user same as previous loged in user and there is no options to update we just emit empty object to process strem.
        If user is new we will fetch all options, but if user same and some options should be updated we will identify this options and make partial fetch of the options.
    * * STEP 3: Using switchMap we are canceling previous subsciption to the stream and getting already cached options from indexDB to merge them with currently
        fetched new options.
    * * STEP 4: After success fetching all needed data, we store new update index DB with new user email and new options, and we are storing
        in the local storage new time when we did last caching.
    */
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
