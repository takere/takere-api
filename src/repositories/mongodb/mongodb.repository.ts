import Repository from '../repository';
import UserRepository from '../user.repository';
import NodeRepository from '../node.repository';
import FlowRepository from '../flow.repository';
import FinishedRepository from '../finished.repository';
import BoardRepository from '../board.repository';
import EdgeRepository from '../edge.repository';
import BoardCollection from './collections/board.collection';
import EdgeCollection from './collections/edge.collection';
import FinishedCollection from './collections/finished.collection';
import FlowCollection from './collections/flow.collection';
import NodeCollection from './collections/node.collection';
import UserCollection from './collections/user.collection';

import mongoose from 'mongoose';
import dbConfig from '../../config/db.config';
import logger from '../../config/logger.config';
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
  private static _instance: MongoDbRepository;

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
    return new UserCollection();
  }

  public get nodeRepository(): NodeRepository {
    return new NodeCollection();
  }

  public get flowRepository(): FlowRepository {
    return new FlowCollection();
  }

  public get finishedRepository(): FinishedRepository {
    return new FinishedCollection();
  }

  public get edgeRepository(): EdgeRepository {
    return new EdgeCollection();
  }
  public get boardRepository(): BoardRepository {
    return new BoardCollection();
  }
}

export default MongoDbRepository;
