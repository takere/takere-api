/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import FlowService from '../services/flow.service';
import LocaleService from '../services/locale.service';


class FlowController {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly flowService: FlowService;
  private readonly localeService: LocaleService;
  

  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    this.flowService = new FlowService();
    this.localeService = new LocaleService();
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  public async getAll(req: any, res: any, next: any) {
    const user = await req.user;
    const flows = await this.flowService.findAllByUserId(user.id);

    res.send(flows);
  }
  
  public async get(req: any, res: any, next: any) {
    const user = await req.user;
    const flowId = await req.params.uid;
    const flow = await this.flowService.findByUserIdAndFlowId(user.id, flowId);

    res.send(flow);
  }

  public async remove(req: any, res: any, next: any) {
    const user = await req.user;
    const flowId = await req.params.uid;

    await this.flowService.removeWithUserIdAndFlowId(user.id, flowId);

    res.send(this.localeService.translate('SUCCESS'));
  }

  public async create(req: any, res: any, next: any) {
    const { graph, name, description, patientEmail } = req.body
    const user = await req.user;

    await this.flowService.insert({
      author: user.id,
      name: name,
      patientEmail: patientEmail,
      description: description,
      nodes: graph.filter((d: { type: any; }) => d.type),
      edges: graph.filter((d: { source: any; }) => d.source)
    });

    res.send(this.localeService.translate('SUCCESS'));
  }
}

export default FlowController;
