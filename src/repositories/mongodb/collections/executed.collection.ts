import ExecutedRepository = require('../../executed.repository');
import Executed = require('../../../domain/executed.domain');
import ExecutedDTO = require('../../../dto/executed.dto');

class ExecutedCollection implements ExecutedRepository {
  private _schema: any;

  constructor() {
    this._schema = require('../schemas/executed.schema');
  }

  public async save(executed: ExecutedDTO): Promise<Executed> {
    const targetExecuted = new this._schema({ ...executed, id: undefined });
    const storedExecuted = await targetExecuted.save();

    return { ...storedExecuted, id: storedExecuted._id };
  }
}

export = ExecutedCollection;
