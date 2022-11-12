import mongoose from "mongoose";
import EdgeRepository from '../../edge.repository';
import Edge from '../../../domain/edge.domain';
import EdgeDTO from '../../../dto/edge.dto';
import EdgeSchema from "../schemas/edge.schema";

class EdgeCollection implements EdgeRepository {
  private _schema: any;

  constructor() {
    this._schema = mongoose.model<Edge>("Edge", EdgeSchema);
  }

  public async findOne(fields: object): Promise<Edge> {
    const storedEdge = await this._schema.findOne(fields);

    return { ...storedEdge._doc, id: storedEdge._doc._id };
  }

  public async removeAllWithFlowId(id: string): Promise<Edge[]> {
    return this._schema.deleteMany({ flow: id });
  }

  public async findAllBySourceId(id: string): Promise<Edge[]> {
    return this._schema.find({ source: id });
  }

  public async findAllByUserId(id: string): Promise<Edge[]> {
    return this._schema.find({ user: id });
  }

  public async findAllByFlowId(id: string): Promise<Edge[]> {
    return this._schema.find({ flow: id });
  }

  public async save(edge: EdgeDTO): Promise<Edge> {
    const targetEdge = new this._schema({ ...edge, id: undefined });
    const storedEdge = await targetEdge.save();

    return { ...storedEdge._doc, id: storedEdge._id };
  }
}

export default EdgeCollection;
