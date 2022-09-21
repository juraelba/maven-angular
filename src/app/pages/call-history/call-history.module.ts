import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallHistoryComponent } from './call-history.component';
import { CallHistorySelectComponent } from './call-history-select/call-history-select.component';

import { CallHistoryRoutingModule } from './call-history-routing.module';
import { SearchModule } from '@modules/search/search.module';
import { DatepickerModule } from '@modules/datepicker/datepicker.module';
import { SelectModule } from '@modules/select/select.module';
import { InputModule } from '@modules/input/input.module';

@NgModule({
  declarations: [
    CallHistoryComponent,
    CallHistorySelectComponent
  ],
  imports: [
    CommonModule,
    CallHistoryRoutingModule,
    SearchModule,
    DatepickerModule,
    SelectModule,
    InputModule
  ],
})
export class CallHistoryModule { }
