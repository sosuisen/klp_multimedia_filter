PIXI.filters.EdgeFilter = class extends PIXI.Filter {
  constructor() {
    // Normalized座標系では左上が原点
    const vertexSrc = `
        attribute vec2 aVertexPosition;
        uniform mat3 projectionMatrix;
        varying vec2 vTextureCoord;
        varying vec2 vBlurTexCoords[9];
        uniform vec4 inputSize;
        uniform vec4 outputFrame;
        vec4 filterVertexPosition( void )
        {
            vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;
            return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
        }
        
        vec2 filterTextureCoord( void )
        {
            return aVertexPosition * (outputFrame.zw * inputSize.zw);
        }
        
        void main(void)
        {
            gl_Position = filterVertexPosition();
            vTextureCoord = filterTextureCoord();

            /**
             * 3x3のカーネルに対応する座標を求める
             */
            // 1行目(yが-1)
            vBlurTexCoords[0] = vTextureCoord + vec2(-1.0, -1.0) * inputSize.zw;
            vBlurTexCoords[1] = vTextureCoord + vec2(0.0, -1.0) * inputSize.zw;
            vBlurTexCoords[2] = vTextureCoord + vec2(1.0, -1.0) * inputSize.zw;
            // 2行目(yが0)
            vBlurTexCoords[3] = vTextureCoord + vec2(-1.0, 0.0) * inputSize.zw;
            vBlurTexCoords[4] = vTextureCoord + vec2(0.0, 0.0) * inputSize.zw;
            vBlurTexCoords[5] = vTextureCoord + vec2(1.0, 0.0) * inputSize.zw;
            // 3行目(yが1)
            vBlurTexCoords[6] = vTextureCoord + vec2(-1.0, 1.0) * inputSize.zw;
            vBlurTexCoords[7] = vTextureCoord + vec2(0.0, 1.0) * inputSize.zw;
            vBlurTexCoords[8] = vTextureCoord + vec2(1.0, 1.0) * inputSize.zw;
        }
    `;

    const fragmentSrc = `
        precision mediump float;
        // varying:  頂点シェーダーから、フラグメントシェーダーへ転送されたデータ
        varying vec2 vBlurTexCoords[9];
        uniform sampler2D uSampler;

        void main(void) {
          // Kernel
          // https://en.wikipedia.org/wiki/Kernel_(image_processing)
          
          // Original
          // gl_FragColor = texture2D(uSampler, vTextureCoord);

          // Edge detection
          // 周りの色が全て同じなら黒になります。
          // 周りの色の平均値よりも明るい点のみ色がつきます。
          gl_FragColor = (
            (-1.0) * texture2D(uSampler, vBlurTexCoords[0]) +
            (-1.0) * texture2D(uSampler, vBlurTexCoords[1]) +
            (-1.0) * texture2D(uSampler, vBlurTexCoords[2]) +
            (-1.0) * texture2D(uSampler, vBlurTexCoords[3]) +
            (8.0) * texture2D(uSampler, vBlurTexCoords[4]) +
            (-1.0) * texture2D(uSampler, vBlurTexCoords[5]) +
            (-1.0) * texture2D(uSampler, vBlurTexCoords[6]) +
            (-1.0) * texture2D(uSampler, vBlurTexCoords[7]) +
            (-1.0) * texture2D(uSampler, vBlurTexCoords[8])                         
          );
        }
      `;

    super(
      vertexSrc, // vertex shader
      fragmentSrc, // fragment shader
      {} // uniforms
    );
  }
};