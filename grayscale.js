PIXI.filters.GrayscaleFilter = class extends PIXI.Filter {
  constructor() {
    const fragmentSrc = `
        uniform sampler2D uSampler;
        varying vec2 vTextureCoord; 

        void main(void) {
          vec4 color = texture2D(uSampler, vTextureCoord);

          // color をグレースケールへ変換してください。

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