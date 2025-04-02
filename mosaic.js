import * as PIXI from 'pixi.js';
import fragment from './mosaic.frag';
import vertex from './default.vert';

export const MosaicFilter = class extends PIXI.Filter {
  constructor() {
    super({
      glProgram: new PIXI.GlProgram({
        fragment,
        vertex,
      })
    });
  }
};