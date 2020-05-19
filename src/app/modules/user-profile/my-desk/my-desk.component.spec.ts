import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDeskComponent } from './my-desk.component';

describe('MyDeskComponent', () => {
  let component: MyDeskComponent;
  let fixture: ComponentFixture<MyDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
