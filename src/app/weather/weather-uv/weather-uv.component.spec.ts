import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherUVComponent } from './weather-uv.component';

describe('WeatherUvComponent', () => {
  let component: WeatherUVComponent;
  let fixture: ComponentFixture<WeatherUVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherUVComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherUVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
