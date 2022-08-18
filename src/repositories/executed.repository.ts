import Executed from "../domain/executed.domain";

export default interface ExecutedRepository {
  save(executed: Executed): Promise<Executed>;
}
