import * as PIXI from 'pixi.js';
import fragment from './grayscale.frag';
import vertex from './default.vert';

export const GrayscaleFilter = class extends PIXI.Filter {
  constructor() {
    super({
      glProgram: new PIXI.GlProgram({
        fragment,
        vertex,
      })
    });
  }
};
