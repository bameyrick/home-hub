import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSkyComponent } from './weather-sky.component';

describe('WeatherSkyComponent', () => {
  let component: WeatherSkyComponent;
  let fixture: ComponentFixture<WeatherSkyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherSkyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherSkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
