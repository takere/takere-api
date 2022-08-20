import Repositories = require('../repositories');

abstract class Service {
  protected readonly repository;

  constructor() {
    this.repository = new Repositories();
  }
}

export = Service;
