import * as PIXI from 'pixi.js';
export const MosaicFilter = class extends PIXI.Filter {
  constructor() {
    const fragmentSrc = `
      precision highp float;
      uniform vec4 inputSize;
      varying vec2 vTextureCoord;
      uniform sampler2D uSampler;

      void main(void) {
        float mosaicSize = 5.0;
        vec2 texelPosition = vTextureCoord.xy * inputSize.xy;
      
        // 1辺がmosaicSizeテクセルの正方形の、左上隅の座標
        vec2 cornerPosition = floor(texelPosition / mosaicSize) * mosaicSize;

        // 正規化座標へ戻してから渡す
        gl_FragColor = texture2D(uSampler, cornerPosition * inputSize.zw);
      }
    `;

    super(
      null,
      fragmentSrc,
      {}
    );
  }
};