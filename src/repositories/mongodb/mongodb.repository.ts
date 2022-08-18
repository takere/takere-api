
import FlowRepository from "../flow.repository";
import NodeRepository from "../node.repository";
import Repository from "../repository";
import UserRepository from "../user.repository";

const mongoose = require('mongoose');
const dbConfig = require('../../config/db.config');
const logger = require('../../helpers/logger');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
  // useCreateIndex: true,
  // useFindAndModify: false,
  // autoIndex: false, // Don't build indexes
  // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  // reconnectInterval: 500, // Reconnect every 500ms
  // poolSize: 10, // Maintain up to 10 socket connections
  // // If not connected, return errors immediately rather than waiting for reconnect
  // bufferMaxEntries: 0,
  // connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  // family: 4 // Use IPv4, skip trying IPv6
};

class MongoDbRepository implements Repository {
  //private static _userRepository: UserRepository;
  private static _instance: MongoDbRepository;
  private repositories: any;

  constructor() {
    if (MongoDbRepository._instance) {
      return MongoDbRepository._instance;
    }

    this.initializeRepositories();
    MongoDbRepository._instance = this;
  }

  private initializeRepositories(): void {
    this.repositories = {
      userRepository: this.buildInstance('./collections/user.collection'),
      nodeRepository: this.buildInstance('./collections/node.collection'),
      flowRepository: this.buildInstance('./collections/flow.collection')
    }
  }

  private buildInstance(path: any): any {
    const className = require(path);
    
    return new className();
  }

  /**
   * Opens the connection to database.
   */
  public connect() {
    mongoose.connect(this.buildUri(), options, (err: any) => {
      if (err) {
        logger.error('Unable to connect to the server. Please start the server. Error:', err)
      } 
      else {
        logger.debug('Connected to DB Server successfully! ')
      }
    });
  }

  private buildUri(): string {
    const uri: string[] = [];

    uri.push('mongodb+srv://');
    uri.push(dbConfig.user);
    uri.push(':');
    uri.push(dbConfig.password);
    uri.push('@');
    uri.push(dbConfig.host);
    uri.push('/');
    uri.push(dbConfig.database);
    uri.push('?retryWrites=true&w=majority');

    return uri.join('');
  }

  public get userRepository(): UserRepository {
    return this.repositories['userRepository'];
  }

  public get nodeRepository(): NodeRepository {
    return this.repositories['nodeRepository'];
  }

  public get flowRepository(): FlowRepository {
    return this.repositories['flowRepository'];
  }
}

module.exports = new MongoDbRepository();
