import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingRoomSingleComponent } from './reading-room-single.component';

describe('ReadingRoomSingleComponent', () => {
  let component: ReadingRoomSingleComponent;
  let fixture: ComponentFixture<ReadingRoomSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingRoomSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingRoomSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
