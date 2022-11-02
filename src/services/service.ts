import Repositories from '../repositories';

abstract class Service {
  protected readonly repository;

  constructor() {
    this.repository = new Repositories();
  }
}

export default Service;
