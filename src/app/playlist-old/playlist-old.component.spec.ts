import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistOldComponent } from './playlist-old.component';

describe('PlaylistComponent', () => {
  let component: PlaylistOldComponent;
  let fixture: ComponentFixture<PlaylistOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistOldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
