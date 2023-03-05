import * as PIXI from 'pixi.js';
export const BoxBlurFilter = class extends PIXI.Filter {
  constructor() {
    const fragmentSrc = `
        precision highp float; // inputSizeを利用する場合は highp 指定が必要
        uniform vec4 inputSize;
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;

        void main(void) {
          // original
          // gl_FragColor = texture2D(uSampler, vTextureCoord);

          // Box Blur
          gl_FragColor = (
            texture2D(uSampler, vTextureCoord + vec2(-1.0, -1.0) * inputSize.zw) +
            texture2D(uSampler, vTextureCoord + vec2( 0.0, -1.0) * inputSize.zw) +
            texture2D(uSampler, vTextureCoord + vec2( 1.0, -1.0) * inputSize.zw) +
            texture2D(uSampler, vTextureCoord + vec2(-1.0,  0.0) * inputSize.zw) +
            texture2D(uSampler, vTextureCoord + vec2( 0.0,  0.0) * inputSize.zw) +
            texture2D(uSampler, vTextureCoord + vec2( 1.0,  0.0) * inputSize.zw) +
            texture2D(uSampler, vTextureCoord + vec2(-1.0,  1.0) * inputSize.zw) +
            texture2D(uSampler, vTextureCoord + vec2( 0.0,  1.0) * inputSize.zw) +
            texture2D(uSampler, vTextureCoord + vec2( 1.0,  1.0) * inputSize.zw)                                                                                                
          ) / 9.0;
        }
      `;

    super(
      null, // Use default vertex shader
      fragmentSrc, // fragment shader
      {} // uniforms
    );
  }
};