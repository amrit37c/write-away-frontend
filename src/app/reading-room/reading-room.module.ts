import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadingRoomRoutingModule } from './reading-room-routing.module';
import { ReadingRoomSingleComponent } from './reading-room-single/reading-room-single.component';


@NgModule({
  declarations: [ReadingRoomSingleComponent],
  imports: [
    CommonModule,
    ReadingRoomRoutingModule
  ]
})
export class ReadingRoomModule { }
