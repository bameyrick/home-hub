import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecastNavigationComponent } from './weather-forecast-navigation.component';

describe('WeatherForecastNavigationComponent', () => {
  let component: WeatherForecastNavigationComponent;
  let fixture: ComponentFixture<WeatherForecastNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherForecastNavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherForecastNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
