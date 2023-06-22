import * as PIXI from 'pixi.js';
export const GrayscaleFilter = class extends PIXI.Filter {
  constructor() {
    const fragmentSrc = `
        uniform sampler2D uSampler;
        varying vec2 vTextureCoord; 

        void main(void) {
          vec4 color = texture2D(uSampler, vTextureCoord);

          // color をグレースケールへ変換してください。
          float gray = color.r * 0.2126 + color.g * 0.7152 + color.b * 0.0722;
          color.r = color.g = color.b = gray;
          if (gray >= 0.5){
            gray =1.0;
          }else {
            gray =0.0;
          }
          gl_FragColor = color;
        }
      `;

    super(
      null,
      fragmentSrc, // fragment shader
      {} // uniforms
    );
  }
};