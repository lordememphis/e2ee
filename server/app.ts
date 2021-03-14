import * as express from 'express';
import * as cors from 'cors';
import debug from 'debug';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import RoutesConfig, { ChatRoutes, UserRoutes } from './routes';
import { logger } from './logger';

// @ts-ignore
const app: express.Application = express();
const server = http.createServer(app);
const port: String | Number = process.env.PORT || 3000;
const log: debug.IDebugger = debug('app');
const routes: Array<RoutesConfig> = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// @ts-ignore
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

routes.push(new UserRoutes(app), new ChatRoutes(app));

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
  logger.info(`Server running at http://localhost:${port}`);
  routes.forEach((route: RoutesConfig) =>
    logger.info(`Routes configure for ${route.getName()}`)
  );
});
