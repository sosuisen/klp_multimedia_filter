PIXI.filters.EdgeFilter = class extends PIXI.Filter {
  constructor() {
    const fragmentSrc = `
        precision highp float; // inputSizeを利用する場合は highp 指定が必要
        uniform vec4 inputSize;
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;

        void main(void) {
          // Edge detection
          // 周りの色が全て同じなら黒になります。
          // 周りの色の平均値よりも明るい点のみ色がつきます。
          gl_FragColor = (
            (-1.0) * texture2D(uSampler, vTextureCoord + vec2(-1.0, -1.0) * inputSize.zw) +
            (-1.0) * texture2D(uSampler, vTextureCoord + vec2( 0.0, -1.0) * inputSize.zw) +
            (-1.0) * texture2D(uSampler, vTextureCoord + vec2( 1.0, -1.0) * inputSize.zw) +
            (-1.0) * texture2D(uSampler, vTextureCoord + vec2(-1.0,  0.0) * inputSize.zw) +
            ( 8.0) * texture2D(uSampler, vTextureCoord + vec2( 0.0,  0.0) * inputSize.zw) +
            (-1.0) * texture2D(uSampler, vTextureCoord + vec2( 1.0,  0.0) * inputSize.zw) +
            (-1.0) * texture2D(uSampler, vTextureCoord + vec2(-1.0,  1.0) * inputSize.zw) +
            (-1.0) * texture2D(uSampler, vTextureCoord + vec2( 0.0,  1.0) * inputSize.zw) +
            (-1.0) * texture2D(uSampler, vTextureCoord + vec2( 1.0,  1.0) * inputSize.zw)
          );
        }
      `;

    super(
      null, // Use default vertex shader
      fragmentSrc, // fragment shader
      {} // uniforms
    );
  }
};