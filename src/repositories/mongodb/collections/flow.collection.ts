import FlowRepository from "../../flow.repository";
import Flow from "../../../domain/flow.domain";

class FlowCollection implements FlowRepository {
  private _schema: any;

  constructor() {
    this._schema = require('../schemas/flow.schema');
  }

  public async findOne(fields: object): Promise<Flow> {
    const storedFlow = await this._schema.findOne(fields);

    return { ...storedFlow._doc, id: storedFlow._doc._id };
  }

  public async findOneAndRemove(fields: object): Promise<Flow> {
    const storedFlow = await this._schema.findOneAndRemove(fields);

    return { ...storedFlow._doc, id: storedFlow._doc._id };
  }

  public async find(fields: object): Promise<Flow[]> {
    return this._schema.find(fields);
  }

  public async save(flow: Flow): Promise<Flow> {
    const storedFlow = await this._schema.save({ ...flow, _id: flow.id });

    return { ...storedFlow, id: storedFlow._id };
  }
}

module.exports = FlowCollection;
