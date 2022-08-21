import ExecutedRepository = require('../../executed.repository');
import Executed = require('../../../domain/executed.domain');
import ExecutedDTO = require('../../../dto/executed.dto');

class ExecutedCollection implements ExecutedRepository {
  private _schema: any;

  constructor() {
    this._schema = require('../schemas/executed.schema');
  }

  public async save(executed: ExecutedDTO): Promise<Executed> {
    const storedExecuted = await this._schema.create(executed.result, executed.node);

    return { ...storedExecuted, id: storedExecuted._id };
  }
}

export = ExecutedCollection;
