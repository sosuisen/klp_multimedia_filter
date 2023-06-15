import * as PIXI from 'pixi.js';
export const MosaicFilter = class extends PIXI.Filter {
  constructor() {
    const fragmentSrc = `
      precision highp float;
      uniform vec4 inputSize;
      varying vec2 vTextureCoord;
      uniform sampler2D uSampler;

      void main(void) {



      }
    `;

    super(
      null,
      fragmentSrc,
      {}
    );
  }
};