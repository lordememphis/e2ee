import express from 'express';
import cors from 'cors';
import debug from 'debug';
import * as bodyparser from 'body-parser';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import { CommonRoutesConfig } from './common/common.routes.config';
import { UsersRoutes } from './users/users.routes.config';
import { ChatsRoutes } from './chats/chats.routes.config';

const app: express.Application = express();
const server = http.createServer(app);
const port: String | Number = process.env.PORT || 3000;
const log: debug.IDebugger = debug('app');
const routes: Array<CommonRoutesConfig> = [];

app.use(bodyparser.json());
app.use(cors());
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

routes.push(new UsersRoutes(app), new ChatsRoutes(app));

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

server.listen(port, () => {
  log(`Server running at http://localhost:${port}`);
  routes.forEach((route: CommonRoutesConfig) =>
    log(`Routes configure for ${route.getName()}`)
  );
});
