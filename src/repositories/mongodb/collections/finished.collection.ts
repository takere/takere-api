import FinishedRepository = require('../../finished.repository');
import Finished = require('../../../domain/finished.domain');
import FinishedDTO = require('../../../dto/finished.dto');

class FinishedCollection implements FinishedRepository {
  private _schema: any;

  constructor() {
    this._schema = require('../schemas/finished.schema');
  }

  public async save(finished: FinishedDTO): Promise<Finished> {
    const storedFinished = await this._schema.create(finished.answers, finished.node);

    return { ...storedFinished, id: storedFinished._id };
  }
}

export = FinishedCollection;
