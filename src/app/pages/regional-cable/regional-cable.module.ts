import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionalCableComponent } from './regional-cable.component';
import { RegionalCableRoutingModule } from './regional-cable-routing.module';
import { SearchModule } from '@modules/search/search.module';
import { NameInputModule } from '@modules/name-input/name-input.module';
import { PickListModule } from '@modules/pick-list/pick-list.module';

@NgModule({
  declarations: [RegionalCableComponent],
  imports: [
    CommonModule,
    RegionalCableRoutingModule,
    SearchModule,
    NameInputModule,
    PickListModule,
  ],
})
export class RegionalCableModule {}
