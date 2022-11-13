/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
import dbConfig from '../../config/database.config';
import logger from '../../config/logger.config';
import mongoDbOptions from './mongodb.options';


class MongoDbRepository implements Repository {

  /**
   * Opens the connection to database.
   */
  public connect() {
    mongoose.connect(this.buildUri(), mongoDbOptions, (err: any) => {
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

    if (!dbConfig.user || !dbConfig.password || !dbConfig.host || !dbConfig.database) {
      throw new Error('Database config has missing fields');
    }

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
