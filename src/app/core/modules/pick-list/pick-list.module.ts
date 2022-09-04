import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CategoryPickListComponent } from './category-pick-list/category-pick-list.component';
import { SelectModule } from '../select/select.module';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { SlideToggleModule  } from '../slide-toggle/slide-toggle.module';
import { SvgIconModule } from '../svg-icon/svg-icon.module';

import { ListsService } from '@services/lists/lists.service';
import { UtilsService } from '@services/utils/utils.service';

import { MediaTypePickListComponent } from './media-type-pick-list/media-type-pick-list.component';
import { OwnersPickListComponent } from './owners-pick-list/owners-pick-list.component';
import { DiverseTargetPickListComponent } from './diverse-target-pick-list/diverse-target-pick-list.component';
import { LanguagePickListComponent } from './language-pick-list/language-pick-list.component';
import { MarketPickListComponent } from './market-pick-list/market-pick-list.component';
import { SortingMenuComponent } from './sorting-menu/sorting-menu.component';
import { BandsPickListComponent } from './bands-pick-list/bands-pick-list.component';
import { NetworksPickListComponent } from './networks-pick-list/networks-pick-list.component';
import { DmaMarketsComponent } from './dma-markets/dma-markets.component';
import { SubTypesComponent } from './sub-types/sub-types.component';
import { SpotRadioBandsComponent } from './spot-radio-bands/spot-radio-bands.component';

@NgModule({
  declarations: [
    CategoryPickListComponent,
    MediaTypePickListComponent,
    OwnersPickListComponent,
    DiverseTargetPickListComponent,
    LanguagePickListComponent,
    MarketPickListComponent,
    SortingMenuComponent,
    BandsPickListComponent,
    NetworksPickListComponent,
    DmaMarketsComponent,
    SubTypesComponent,
    SpotRadioBandsComponent
  ],
  imports: [
    CommonModule,
    SelectModule,
    CheckboxModule,
    MatSlideToggleModule,
    MatTooltipModule,
    SlideToggleModule,
    SvgIconModule
  ],
  providers: [
    ListsService,
    UtilsService
  ],
  exports: [
    CategoryPickListComponent,
    MediaTypePickListComponent,
    OwnersPickListComponent,
    DiverseTargetPickListComponent,
    LanguagePickListComponent,
    MarketPickListComponent,
    BandsPickListComponent,
    NetworksPickListComponent,
    DmaMarketsComponent,
    SubTypesComponent,
    SpotRadioBandsComponent
  ]
})
export class PickListModule { }
