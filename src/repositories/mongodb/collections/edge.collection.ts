import EdgeRepository = require('../../edge.repository');
import Edge = require('../../../domain/edge.domain');

class EdgeCollection implements EdgeRepository {
  private _schema: any;

  constructor() {
    this._schema = require('../schemas/edge.schema');
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

  public async save(edge: Edge): Promise<Edge> {
    const targetEdge = new this._schema(edge);
    const storedEdge = await targetEdge.save();

    return { ...storedEdge, id: storedEdge._id };
  }
}

module.exports = EdgeCollection;
