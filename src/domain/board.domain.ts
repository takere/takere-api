import Finished from "./finished.domain";

interface Board {
  id: string,
  name: string,
  description: string,
  patientEmail: string,
  flow: any,
  node: any,
  finished: any
}

export = Board;
