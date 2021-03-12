import * as mongoose from 'mongoose';
import debug from 'debug';

const log: debug.IDebugger = debug('mongo');

class DatabaseService {
  private static instance: DatabaseService;
  private count = 0;
  private mongooseOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  constructor() {
    this.connectWithRetry();
  }

  static getInstance(): DatabaseService {
    if (!this.instance) this.instance = new DatabaseService();
    return this.instance;
  }

  get db(): mongoose.Mongoose {
    return mongoose;
  }

  private connectWithRetry() {
    log('Connecting database with retry');
    mongoose
      .connect('mongodb://localhost:27017/e2ee_demo', this.mongooseOptions)
      .then(() => log('Database connected'))
      .catch((err) => {
        log(
          `Database connection failed. Retrying (#${++this.count}) in 5s`,
          err
        );
        setTimeout(this.connectWithRetry, 5000);
      });
  }
}

export default DatabaseService.getInstance();
