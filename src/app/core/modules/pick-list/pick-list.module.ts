import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CategoryPickListComponent } from './category-pick-list/category-pick-list.component';
import { SelectModule } from '../select/select.module';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { SlideToggleModule  } from '../slide-toggle/slide-toggle.module';

import { ListsService } from '../../services/lists/lists.service';
import { MediaTypePickListComponent } from './media-type-pick-list/media-type-pick-list.component';
import { OwnersPickListComponent } from './owners-pick-list/owners-pick-list.component';

@NgModule({
  declarations: [
    CategoryPickListComponent,
    MediaTypePickListComponent,
    OwnersPickListComponent
  ],
  imports: [
    CommonModule,
    SelectModule,
    CheckboxModule,
    MatSlideToggleModule,
    MatTooltipModule,
    SlideToggleModule
  ],
  providers: [
    ListsService
  ],
  exports: [
    CategoryPickListComponent,
    MediaTypePickListComponent,
    OwnersPickListComponent
  ]
})
export class PickListModule { }
