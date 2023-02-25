PIXI.filters.BoxBlurFilter = class extends PIXI.Filter {
  constructor() {
    // Normalized座標系では左上が原点

    const fragmentSrc = `
        precision mediump float;
        // varying:  頂点シェーダーから、フラグメントシェーダーへ転送されたデータ
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;
        uniform vec4 outputFrame;
        vec2 onePixel = vec2(1.0, 1.0) / vec2(260, 260);

        void main(void) {
          gl_FragColor = (
            texture2D(uSampler, vTextureCoord + onePixel*vec2(-1.0, -1.0)) +
            texture2D(uSampler, vTextureCoord + onePixel*vec2(0.0, -1.0)) +
            texture2D(uSampler, vTextureCoord + onePixel*vec2(1.0, -1.0)) +            
            texture2D(uSampler, vTextureCoord + onePixel*vec2(-1.0, 0.0)) +
            texture2D(uSampler, vTextureCoord + onePixel*vec2(0.0, 0.0)) +
            texture2D(uSampler, vTextureCoord + onePixel*vec2(1.0, 0.0)) +
            texture2D(uSampler, vTextureCoord + onePixel*vec2(-1.0, 1.0)) +
            texture2D(uSampler, vTextureCoord + onePixel*vec2(0.0, 1.0)) +                                                            
            texture2D(uSampler, vTextureCoord + onePixel*vec2(1.0, 1.0))
          ) / 9.0;
        }
      `;

    super(
      null, // vertex shader
      fragmentSrc, // fragment shader
      {} // uniforms
    );
  }
};