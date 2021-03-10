import express from 'express';

export default abstract class RoutesConfig {
  app: express.Application;
  name: string;

  constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
    this.configureRoutes();
  }

  getName(): string {
    return this.name;
  }

  abstract configureRoutes(): express.Application;
}

export { ChatRoutes } from './chat.routes.config';
export { UserRoutes } from './user.routes.config';
