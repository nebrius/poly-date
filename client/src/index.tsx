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

import React from 'react';
import { render } from 'react-dom';
import { connect } from './connection';
// import { createApp } from './reduxology';

async function run() {
  await connect();
  console.log('Connected to server');

  // const app = createApp({
  //   container: AppContainer,
  //   listeners,
  //   reducers: [
  //     createZonesReducers(appState.zones),
  //     createSchedulesReducers(appState.schedules),
  //     createScenesReducers(appState.scenes, appState.version),
  //     createPatternsReducers(appState.patterns),
  //     createLightsReducers(appState.lights),
  //     createStateReducers(appState.systemState),
  //     createSettingsReducers(appState.settings),
  //     localStateReducer,
  //     notificationsReducer
  //   ]
  // });

  render(<div>Poly Date</div>, document.getElementById('app'));
}
run();
