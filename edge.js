import * as PIXI from 'pixi.js';
import fragment from './edge.frag';
import vertex from './default.vert';

export const EdgeFilter = class extends PIXI.Filter {
  constructor() {
    super({
      glProgram: new PIXI.GlProgram({
        fragment,
        vertex,
      })
    });
  }
};