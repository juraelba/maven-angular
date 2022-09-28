import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SearchColumnsEnum, SearchColumnsIdEnum, SearchMediaProfileEnumTitles } from '@enums/search.enum';
import { StyleTypesEnum } from '@enums/styles.enum';
import { SearchMediaProfileTitleKey } from '@models/search.model';
import { Column, Row, Table } from '@models/table.model';
import { SpotRadioListComponent } from '../../spot-radio-search/spot-radio-list/spot-radio-list.component';

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
    id: SearchColumnsIdEnum.mavenid,
    label: SearchColumnsEnum.mavenid,
    width: 200
  },
  {
    id: SearchColumnsIdEnum.name,
    label: SearchColumnsEnum.name,
    width: 200
  },
  {
    id: SearchColumnsIdEnum.market,
    label: SearchColumnsEnum.market,
    width: 200
  }
];

@Component({
  selector: 'app-spot-tv-list',
  templateUrl: './spot-tv-list.component.html',
  styleUrls: ['./spot-tv-list.component.scss']
})
export class SpotTvListComponent implements OnInit {
  styleTypes = StyleTypesEnum;
  tittle: SearchMediaProfileEnumTitles;

  data: Table = { rows: [], columns: [] };
  tableStyles: { [key: string]: string } = { height: '500px' }

  constructor(
    private dialogRef: MatDialogRef<SpotRadioListComponent>,
    private router: Router
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
