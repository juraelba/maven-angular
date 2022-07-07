import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { PickListModule } from '../../pick-list/pick-list.module';

import { MediaSearchRoutingModule } from './media-search-routing.module';
import { MediaSearchComponent } from './media-search.component';
import { InputComponent } from '../../core/components/input/input.component';
import { CheckboxComponent } from '../../core/components/checkbox/checkbox.component';

@NgModule({
  declarations: [
    MediaSearchComponent,
    InputComponent,
    CheckboxComponent
  ],
  imports: [
    CommonModule,
    MediaSearchRoutingModule,
    MatCheckboxModule,
    PickListModule
  ]
})
export class MediaSearchModule { }
