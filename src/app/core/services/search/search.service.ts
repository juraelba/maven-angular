import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { compose, toPairs, reduce } from 'ramda';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

import { SearchKey, SearchResultItem } from '@models/search.model';
import { Table, Row } from '@models/table.model';
import { ListKeys } from '@enums/lists.enum';

import { SEARCH_COLUMNS } from '../../data/constants';

const MOCK: SearchResultItem[] = [
  {
    "mavenid": "C10000",
    "name": "Media - 1",
    "typeID": 3,
    "type": "Network Cable",
    "subTypeID": 7,
    "subType": "Cable Network",
    "marketID": 1000,
    "market": "National (USA)",
    "ownerID": 12821,
    "owner": "Owner - 1736",
    "parentID": "12821",
    "parent": "Owner - 1736",
    "website": "3abn.org",
    "partnerID": null,
    "partners": null,
    "sort": 2
  },
  {
    "mavenid": "C10157",
    "name": "Media - 100",
    "typeID": 3,
    "type": "Network Cable",
    "subTypeID": 7,
    "subType": "Cable Network",
    "marketID": 1000,
    "market": "National (USA)",
    "ownerID": 13533,
    "owner": "Owner - 2132",
    "parentID": "13533",
    "parent": "Owner - 2132",
    "website": "rtve.es",
    "partnerID": null,
    "partners": null,
    "sort": 2
  },
  {
    "mavenid": "I19362",
    "name": "Media - 10001",
    "typeID": 1,
    "type": "Digital",
    "subTypeID": 18,
    "subType": "Website",
    "marketID": 616,
    "market": "Kansas City, MO",
    "ownerID": 24612,
    "owner": "Owner - 8555",
    "parentID": "13090",
    "parent": "Owner - 1864",
    "website": "ksisradio.com",
    "partnerID": "R10907",
    "partners": "KSIS-AM (Spot Radio)",
    "sort": 2
  },
  {
    "mavenid": "C10000",
    "name": "Media - 1",
    "typeID": 3,
    "type": "Network Cable",
    "subTypeID": 7,
    "subType": "Cable Network",
    "marketID": 1000,
    "market": "National (USA)",
    "ownerID": 12821,
    "owner": "Owner - 1736",
    "parentID": "12821",
    "parent": "Owner - 1736",
    "website": "3abn.org",
    "partnerID": null,
    "partners": null,
    "sort": 2
  },
  {
    "mavenid": "C10157",
    "name": "Media - 100",
    "typeID": 3,
    "type": "Network Cable",
    "subTypeID": 7,
    "subType": "Cable Network",
    "marketID": 1000,
    "market": "National (USA)",
    "ownerID": 13533,
    "owner": "Owner - 2132",
    "parentID": "13533",
    "parent": "Owner - 2132",
    "website": "rtve.es",
    "partnerID": null,
    "partners": null,
    "sort": 2
  },
  {
    "mavenid": "I19362",
    "name": "Media - 10001",
    "typeID": 1,
    "type": "Digital",
    "subTypeID": 18,
    "subType": "Website",
    "marketID": 616,
    "market": "Kansas City, MO",
    "ownerID": 24612,
    "owner": "Owner - 8555",
    "parentID": "13090",
    "parent": "Owner - 1864",
    "website": "ksisradio.com",
    "partnerID": "R10907",
    "partners": "KSIS-AM (Spot Radio)",
    "sort": 2
  },
  {
    "mavenid": "C10000",
    "name": "Media - 1",
    "typeID": 3,
    "type": "Network Cable",
    "subTypeID": 7,
    "subType": "Cable Network",
    "marketID": 1000,
    "market": "National (USA)",
    "ownerID": 12821,
    "owner": "Owner - 1736",
    "parentID": "12821",
    "parent": "Owner - 1736",
    "website": "3abn.org",
    "partnerID": null,
    "partners": null,
    "sort": 2
  },
  {
    "mavenid": "C10157",
    "name": "Media - 100",
    "typeID": 3,
    "type": "Network Cable",
    "subTypeID": 7,
    "subType": "Cable Network",
    "marketID": 1000,
    "market": "National (USA)",
    "ownerID": 13533,
    "owner": "Owner - 2132",
    "parentID": "13533",
    "parent": "Owner - 2132",
    "website": "rtve.es",
    "partnerID": null,
    "partners": null,
    "sort": 2
  },
  {
    "mavenid": "I19362",
    "name": "Media - 10001",
    "typeID": 1,
    "type": "Digital",
    "subTypeID": 18,
    "subType": "Website",
    "marketID": 616,
    "market": "Kansas City, MO",
    "ownerID": 24612,
    "owner": "Owner - 8555",
    "parentID": "13090",
    "parent": "Owner - 1864",
    "website": "ksisradio.com",
    "partnerID": "R10907",
    "partners": "KSIS-AM (Spot Radio)",
    "sort": 2
  },
  {
    "mavenid": "C10000",
    "name": "Media - 1",
    "typeID": 3,
    "type": "Network Cable",
    "subTypeID": 7,
    "subType": "Cable Network",
    "marketID": 1000,
    "market": "National (USA)",
    "ownerID": 12821,
    "owner": "Owner - 1736",
    "parentID": "12821",
    "parent": "Owner - 1736",
    "website": "3abn.org",
    "partnerID": null,
    "partners": null,
    "sort": 2
  },
  {
    "mavenid": "C10157",
    "name": "Media - 100",
    "typeID": 3,
    "type": "Network Cable",
    "subTypeID": 7,
    "subType": "Cable Network",
    "marketID": 1000,
    "market": "National (USA)",
    "ownerID": 13533,
    "owner": "Owner - 2132",
    "parentID": "13533",
    "parent": "Owner - 2132",
    "website": "rtve.es",
    "partnerID": null,
    "partners": null,
    "sort": 2
  },
  {
    "mavenid": "I19362",
    "name": "Media - 10001",
    "typeID": 1,
    "type": "Digital",
    "subTypeID": 18,
    "subType": "Website",
    "marketID": 616,
    "market": "Kansas City, MO",
    "ownerID": 24612,
    "owner": "Owner - 8555",
    "parentID": "13090",
    "parent": "Owner - 1864",
    "website": "ksisradio.com",
    "partnerID": "R10907",
    "partners": "KSIS-AM (Spot Radio)",
    "sort": 2
  },
  {
    "mavenid": "C10000",
    "name": "Media - 1",
    "typeID": 3,
    "type": "Network Cable",
    "subTypeID": 7,
    "subType": "Cable Network",
    "marketID": 1000,
    "market": "National (USA)",
    "ownerID": 12821,
    "owner": "Owner - 1736",
    "parentID": "12821",
    "parent": "Owner - 1736",
    "website": "3abn.org",
    "partnerID": null,
    "partners": null,
    "sort": 2
  },
  {
    "mavenid": "C10157",
    "name": "Media - 100",
    "typeID": 3,
    "type": "Network Cable",
    "subTypeID": 7,
    "subType": "Cable Network",
    "marketID": 1000,
    "market": "National (USA)",
    "ownerID": 13533,
    "owner": "Owner - 2132",
    "parentID": "13533",
    "parent": "Owner - 2132",
    "website": "rtve.es",
    "partnerID": null,
    "partners": null,
    "sort": 2
  },
  {
    "mavenid": "I19362",
    "name": "Media - 10001",
    "typeID": 1,
    "type": "Digital",
    "subTypeID": 18,
    "subType": "Website",
    "marketID": 616,
    "market": "Kansas City, MO",
    "ownerID": 24612,
    "owner": "Owner - 8555",
    "parentID": "13090",
    "parent": "Owner - 1864",
    "website": "ksisradio.com",
    "partnerID": "R10907",
    "partners": "KSIS-AM (Spot Radio)",
    "sort": 2
  },
  {
    "mavenid": "C10000",
    "name": "Media - 1",
    "typeID": 3,
    "type": "Network Cable",
    "subTypeID": 7,
    "subType": "Cable Network",
    "marketID": 1000,
    "market": "National (USA)",
    "ownerID": 12821,
    "owner": "Owner - 1736",
    "parentID": "12821",
    "parent": "Owner - 1736",
    "website": "3abn.org",
    "partnerID": null,
    "partners": null,
    "sort": 2
  },
  {
    "mavenid": "C10157",
    "name": "Media - 100",
    "typeID": 3,
    "type": "Network Cable",
    "subTypeID": 7,
    "subType": "Cable Network",
    "marketID": 1000,
    "market": "National (USA)",
    "ownerID": 13533,
    "owner": "Owner - 2132",
    "parentID": "13533",
    "parent": "Owner - 2132",
    "website": "rtve.es",
    "partnerID": null,
    "partners": null,
    "sort": 2
  },
  {
    "mavenid": "I19362",
    "name": "Media - 10001",
    "typeID": 1,
    "type": "Digital",
    "subTypeID": 18,
    "subType": "Website",
    "marketID": 616,
    "market": "Kansas City, MO",
    "ownerID": 24612,
    "owner": "Owner - 8555",
    "parentID": "13090",
    "parent": "Owner - 1864",
    "website": "ksisradio.com",
    "partnerID": "R10907",
    "partners": "KSIS-AM (Spot Radio)",
    "sort": 2
  }
];

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  createSearch(criterias: any, key: SearchKey): Observable<any> {
    const url = environment.api + '/search/' + key;

    const searchOptions = this.transformCriteriasToSearchOptions(criterias);

    return this.http.post(url, searchOptions)
  }

  executeSearch(id: number): Observable<any> {
    const url = `${ environment.api }/savedsearch/${ id }/run`;

    return this.http.get(url);
  }

  transformOptions(options: any): any {
    return options.map(({ id, value }: any) => ({ id, name: value }));
  }

  transformCategories(data: any): any {
    return this.transformOptions(data.options);
  }

  transformCriteriasToSearchOptions(criterias: any) {
    const trasformers: any = {
      [ListKeys.categories]: this.transformCategories.bind(this),
      default: this.transformOptions.bind(this)
    }

    return compose<any, any, any>(
      reduce<any, any>((acc, [ key, value ]: any) => {
        const transformer = trasformers[key] || trasformers.default;

        acc[key] = transformer(value);

        return acc;
      }, {}),
      toPairs
    )(criterias)
  }

  transformSearchResultToTableData(searchResult: SearchResultItem[], key: SearchKey): Table {
    const columns = SEARCH_COLUMNS[key] || [];

    const rows = MOCK.reduce<Row[]>((acc, cur) => {
      const row = {
        id: cur.mavenid,
        data: cur
      };

      acc.push(row);

      return acc;
    }, []);

    return {
      rows,
      columns
    }
  }
}
