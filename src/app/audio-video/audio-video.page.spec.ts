import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AudioVideoPage } from './audio-video.page';

describe('AudioVideoPage', () => {
  let component: AudioVideoPage;
  let fixture: ComponentFixture<AudioVideoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AudioVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
