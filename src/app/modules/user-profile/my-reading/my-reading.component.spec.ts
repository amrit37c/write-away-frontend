import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReadingComponent } from './my-reading.component';

describe('MyReadingComponent', () => {
  let component: MyReadingComponent;
  let fixture: ComponentFixture<MyReadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
