import * as PIXI from 'pixi.js';
import fragment from './boxblur.frag';
import vertex from './default.vert';

export const BoxBlurFilter = class extends PIXI.Filter {
  constructor() {
    super({
      glProgram: new PIXI.GlProgram({
        fragment,
        vertex,
      }),
      resources: {
        uniform: {}
      }
    });
  }
};
