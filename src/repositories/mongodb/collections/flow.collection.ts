import mongoose from "mongoose";
import FlowRepository from '../../flow.repository';
import Flow from '../../../domain/flow.domain';
import FlowDTO from '../../../dto/flow.dto';
import FlowSchema from "../schemas/flow.schema";

class FlowCollection implements FlowRepository {
  private _schema: any;

  constructor() {
    this._schema = mongoose.model<Flow>("Flow", FlowSchema);
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

  public async save(flow: FlowDTO): Promise<Flow> {
    const targetFlow = new this._schema({ ...flow, id: undefined });
    const storedFlow = await targetFlow.save();

    return { ...storedFlow._doc, id: storedFlow._id };
  }
}

export default FlowCollection;
