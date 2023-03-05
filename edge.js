import * as PIXI from 'pixi.js';
export const EdgeFilter = class extends PIXI.Filter {
  constructor() {
    const vertexSrc = `
        uniform vec4 outputFrame;
        attribute vec2 aVertexPosition;
        uniform mat3 projectionMatrix;
        uniform vec4 inputSize;
        varying vec2 vTextureCoord;
        varying vec2 vBlurTexCoords[9];

        vec4 filterVertexPosition( void )
        {
            vec2 position = aVertexPosition * outputFrame.zw + outputFrame.xy;
            return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
        }
        
        vec2 filterTextureCoord( void )
        {
            return aVertexPosition * outputFrame.zw * inputSize.zw;
        }
        
        void main(void)
        {
            gl_Position = filterVertexPosition();
            vTextureCoord = filterTextureCoord();

            /**
             * 3x3のカーネルに対応する座標を求める
             * 入力画像上の1ピクセルは、
             * vTextureCoord上では幅が1/inputSize.x、高さが1/inputSize.y
             * これは幅が1*inputSize.z、高さが1*inputSize.wとも書ける。
             */
            // 1行目(yが-1)
            vBlurTexCoords[0] = vTextureCoord + vec2(-1.0, -1.0) * inputSize.zw;
            vBlurTexCoords[1] = vTextureCoord + vec2( 0.0, -1.0) * inputSize.zw;
            vBlurTexCoords[2] = vTextureCoord + vec2( 1.0, -1.0) * inputSize.zw;
            // 2行目(yが0)
            vBlurTexCoords[3] = vTextureCoord + vec2(-1.0,  0.0) * inputSize.zw;
            vBlurTexCoords[4] = vTextureCoord + vec2( 0.0,  0.0) * inputSize.zw;
            vBlurTexCoords[5] = vTextureCoord + vec2( 1.0,  0.0) * inputSize.zw;
            // 3行目(yが1)
            vBlurTexCoords[6] = vTextureCoord + vec2(-1.0,  1.0) * inputSize.zw;
            vBlurTexCoords[7] = vTextureCoord + vec2( 0.0,  1.0) * inputSize.zw;
            vBlurTexCoords[8] = vTextureCoord + vec2( 1.0,  1.0) * inputSize.zw;
        }
    `;

    const fragmentSrc = `
        varying vec2 vBlurTexCoords[9];
        uniform sampler2D uSampler;

        void main(void) {
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
      vertexSrc,
      fragmentSrc,
      {}
    );
  }
};