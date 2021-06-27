/*
Copyright (c) Bryan Hughes <bryan@nebri.us>

This file is part of Poly Date.

Home Lights is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Home Lights is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Home Lights.  If not, see <http://www.gnu.org/licenses/>.
*/

import { google } from 'googleapis';
import { debug } from '../log';
import { getEnvironmentVariable } from '../util';

const CLIENT_ID = getEnvironmentVariable('GOOGLE_CLIENT_ID');
const CLIENT_SECRET = getEnvironmentVariable('GOOGLE_CLIENT_SECRET');
const REDIRECT_URL = getEnvironmentVariable('GOOGLE_REDIRECT_URL');

let authUrl: string | undefined;

export async function init(): Promise<void> {
  debug('Initializing Google provider');

  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );

  // generate a url that asks permissions for Blogger and Google Calendar scopes
  const scopes = ['https://www.googleapis.com/auth/calendar'];

  /* eslint-disable @typescript-eslint/naming-convention */
  authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    // This shouldn't be necessary, but there's a bug in Google's code that
    // strips the schema off the URL, making it invalid
    redirect_uri: 'http://localhost:3000'
  });
  /* eslint-enable @typescript-eslint/naming-convention */
}

export function getAuthUrl(): string {
  if (typeof authUrl !== 'string') {
    throw new Error('getUrl called before being initialized');
  }
  return authUrl;
}
