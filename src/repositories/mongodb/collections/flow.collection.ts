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

  public async findByAuthorAndFlow(authorId: string, flowId: string): Promise<Flow> {
    const storedFlow = await this._schema.findOne({ author: authorId, _id: flowId });

    return { ...storedFlow._doc, id: storedFlow._doc._id };
  }

  public async removeByAuthorAndFlow(authorId: string, flowId: string): Promise<Flow> {
    const storedFlow = await this._schema.findOneAndRemove({ author: authorId, _id: flowId });

    return { ...storedFlow._doc, id: storedFlow._doc._id };
  }

  public async findById(id: string): Promise<Flow> {
    return this._schema.findOne({ _id: id });
  }

  public async findAllByAuthor(authorId: string): Promise<Flow[]> {
    return this._schema.find({ author: authorId });
  }

  public async save(flow: FlowDTO): Promise<Flow> {
    const targetFlow = new this._schema({ ...flow, id: undefined });
    const storedFlow = await targetFlow.save();

    return { ...storedFlow._doc, id: storedFlow._id };
  }
}

export default FlowCollection;
