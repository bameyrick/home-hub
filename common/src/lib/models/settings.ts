import { CalDavCredentials } from './caldav-credentials.model';
import { NullableLatLon } from './lat-lon';
import { MetOfficeCredentials } from './metoffice-credentials';

export interface Settings extends MetOfficeCredentials, CalDavCredentials {
  weatherLocations: NullableLatLon[];
}
