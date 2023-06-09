import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { InputModule } from '@modules/input/input.module';
import { SearchModule } from '@modules/search/search.module';
import { CirculationModule } from '@modules/shared/circulation/circulation.module';
import { SvgIconModule } from '@modules/svg-icon/svg-icon.module';
import { TableModule } from '@modules/table/table.module';
import { PipeModule } from 'src/app/ui-kit/pipe/pipe.module';
import { DynamicMediaProfileComponent } from './dynamic-media-profile.component';

@NgModule({
  declarations: [DynamicMediaProfileComponent],
  imports: [
    CommonModule,
    SearchModule,
    SvgIconModule,
    MatDialogModule,
    InputModule,
    TableModule,
    PipeModule,
    CirculationModule,
  ],
  providers: [],
  exports: [DynamicMediaProfileComponent],
})
export class DynamicMediaProfileModule {}
