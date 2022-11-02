import EdgeRepository from '../../edge.repository';
import Edge from '../../../domain/edge.domain';
import EdgeDTO from '../../../dto/edge.dto';
import edgeSchema from '../schemas/edge.schema';

class EdgeCollection implements EdgeRepository {
  private _schema: any;

  constructor() {
    this._schema = edgeSchema;
  }

  public async findOne(fields: object): Promise<Edge> {
    const storedEdge = await this._schema.findOne(fields);

    return { ...storedEdge._doc, id: storedEdge._doc._id };
  }

  public async deleteMany(fields: object): Promise<Edge[]> {
    return this._schema.deleteMany(fields);
  }

  public async find(fields: object): Promise<Edge[]> {
    return this._schema.find(fields);
  }

  public async save(edge: EdgeDTO): Promise<Edge> {
    const targetEdge = new this._schema({ ...edge, id: undefined });
    const storedEdge = await targetEdge.save();

    return { ...storedEdge._doc, id: storedEdge._id };
  }
}

export = EdgeCollection;
