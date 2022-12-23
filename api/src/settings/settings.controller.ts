import { Settings } from '@home-hub/common';
import { Body, Controller, Get, Put } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  public getSettings(): Promise<Settings> {
    return this.settingsService.getSettings();
  }

  @Put()
  public updateSettings(@Body() settings: Settings): Promise<Settings> {
    return this.settingsService.updateSettings(settings);
  }
}
