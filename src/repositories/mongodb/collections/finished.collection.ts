import FinishedRepository from '../../finished.repository';
import Finished from '../../../domain/finished.domain';
import FinishedDTO from '../../../dto/finished.dto';
import finishedSchema from '../schemas/finished.schema';

class FinishedCollection implements FinishedRepository {
  private _schema: any;

  constructor() {
    this._schema = finishedSchema;
  }

  public async save(finished: FinishedDTO): Promise<Finished> {
    const storedFinished = await this._schema.create(finished.answers, finished.node);

    return { ...storedFinished, id: storedFinished._id };
  }

  public async removeAllWithNodeId(id: any): Promise<Finished[]> {
    return this._schema.deleteMany({ node: id });
  }
}

export default FinishedCollection;
