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

import { join } from 'path';
import Fastify from 'fastify';
import fastifiStatic from 'fastify-static';
import WebSocket, { Server } from 'ws';
import { logger } from './log';

export function init(): Promise<void> {
  return new Promise((resolve, reject) => {
    const app = Fastify({ logger });

    app.register(fastifiStatic, {
      root: join(__dirname, '..', 'public')
    });

    app.listen(process.env.PORT || 3000, '0.0.0.0', (err, address) => {
      if (err) {
        app.log.error(err);
        reject();
      }
      app.log.info(`server listening on ${address}`);
      resolve();
    });

    const server = new Server({
      server: app.server
    });

    let isProcessing = false;
    const processingQueue: {
      message: WebSocket.Data;
      connection: WebSocket;
    }[] = [];
    server.on('connection', (connection) => {
      connection.on('message', async (message) => {
        processingQueue.push({ message, connection });
        if (isProcessing) {
          return;
        }
        isProcessing = true;
        processQueue();
      });
    });

    async function processQueue() {
      // TODO
    }
  });
}
