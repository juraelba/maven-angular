import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

import { StyleTypesEnum } from '@enums/styles.enum';
import { SearchMediaProfileEnumTitles, SearchEnum, SearchColumnsIdEnum, SearchColumnsEnum, SearchFiedlsEnum  } from '@enums/search.enum';

import { SearchMediaProfileTitleKey } from '@models/search.model';
import { Column } from '@models/table.model';
import { Table, Row } from '@models/table.model';

const MOCK_ROWS: Row[] = [
  {
    id: '1',
    data: {
      [SearchColumnsIdEnum.mavenid]: 'R40107',
      [SearchColumnsIdEnum.name]: 'APEX Exchange Local Aggregate',
      [SearchColumnsIdEnum.market]: 'National (USA)'
    }
  },
  {
    id: '2',
    data: {
      [SearchColumnsIdEnum.mavenid]: 'R30421',
      [SearchColumnsIdEnum.name]: 'CIMX-FM',
      [SearchColumnsIdEnum.market]: 'Detroit, MI'
    }
  },
  {
    id: '3',
    data: {
      [SearchColumnsIdEnum.mavenid]: 'R36230',
      [SearchColumnsIdEnum.name]: 'iHeart Local Aggregate',
      [SearchColumnsIdEnum.market]: 'National (USA)'
    }
  },
  {
    id: '4',
    data: {
      [SearchColumnsIdEnum.mavenid]: 'R21141',
      [SearchColumnsIdEnum.name]: 'Joel Mccrea is also acting GSM (alias)',
      [SearchColumnsIdEnum.market]: 'Des Moines-Ames, IA'
    }
  }
];

const COLUMNS: Column[] = [
  {
    id: SearchColumnsIdEnum.name,
    label: SearchColumnsEnum.name,
    width: 200
  },
  {
    id: SearchColumnsIdEnum.mavenid,
    label: SearchColumnsEnum.mavenid,
    width: 200
  },
  {
    id: SearchColumnsIdEnum.market,
    label: SearchColumnsEnum.market,
    width: 200
  }
];

@Component({
  selector: 'app-spot-radio-list',
  templateUrl: './spot-radio-list.component.html',
  styleUrls: ['./spot-radio-list.component.scss']
})
export class SpotRadioListComponent implements OnInit {
  styleTypes = StyleTypesEnum;
  tittle: SearchMediaProfileEnumTitles;

  data: Table = { rows: [], columns: [] };
  tableStyles: { [key: string]: string } = { height: '500px' }

  constructor(
    private dialogRef: MatDialogRef<SpotRadioListComponent>,
    private router : Router
  ) { }

  ngOnInit(): void {
    const searchScreenKey = this.router.url.split('/')[1] as SearchMediaProfileTitleKey;

    this.data = {
      rows: MOCK_ROWS,
      columns: COLUMNS
    };

    this.tittle = SearchMediaProfileEnumTitles[searchScreenKey];
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
