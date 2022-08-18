import ExecutedRepository from "../../executed.repository";
import Executed from "../../../domain/executed.domain";

class ExecutedCollection implements ExecutedRepository {
  private _schema: any;

  constructor() {
    this._schema = require('../schemas/executed.schema');
  }

  public async save(executed: Executed): Promise<Executed> {
    const targetExecuted = new this._schema(executed);
    const storedExecuted = await targetExecuted.save();

    return { ...storedExecuted, id: storedExecuted._id };
  }
}

module.exports = ExecutedCollection;
