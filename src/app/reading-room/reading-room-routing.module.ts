import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReadingRoomSingleComponent} from './reading-room-single/reading-room-single.component';

const routes: Routes = [
  {path: '', component: ReadingRoomSingleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadingRoomRoutingModule { }
