import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WritePublicationComponent } from './write-publication.component';

describe('WritePublicationComponent', () => {
  let component: WritePublicationComponent;
  let fixture: ComponentFixture<WritePublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritePublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritePublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
