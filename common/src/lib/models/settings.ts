import { NullableLatLon } from './lat-lon';
import { MetOfficeCredentials } from './metoffice-credentials';

export interface Settings extends MetOfficeCredentials {
  weatherLocations: NullableLatLon[];
}
