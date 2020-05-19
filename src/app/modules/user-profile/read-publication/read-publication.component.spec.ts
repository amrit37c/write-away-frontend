import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadPublicationComponent } from './read-publication.component';

describe('ReadPublicationComponent', () => {
  let component: ReadPublicationComponent;
  let fixture: ComponentFixture<ReadPublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadPublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
