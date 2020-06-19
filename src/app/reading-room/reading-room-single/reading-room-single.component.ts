import { Component, OnInit } from '@angular/core';
import { volumes } from './reading-model';
@Component({
  selector: 'app-reading-room-single',
  templateUrl: './reading-room-single.component.html',
  styleUrls: ['./reading-room-single.component.css']
})
export class ReadingRoomSingleComponent implements OnInit {

  currentVol = 0;
  currentTopic = null;

  reading = {
      "publication": {
        'title'    : "WRITING PROMPTS FOR GRADES",
        'genres'   : ['Fantasy', 'Classic'],
        "created_at"  : "June 24, 2020",
        "rating"   : 3,
        "reads"    : 1200
      },
      "volumes": volumes
  }
  constructor() { }

  ngOnInit() {
    console.log(this.reading);
  }

  increment() {
    if(this.currentVol < this.reading.volumes.length - 1){
      this.currentTopic = null;
      this.currentVol++;
    } 
    
  }

  decrement() {
    if(this.currentVol > 0) {
      this.currentVol--;
      this.currentTopic = null;
    } 
  }

  loadTopic(topic) {
    this.currentTopic = topic;
  }
}
