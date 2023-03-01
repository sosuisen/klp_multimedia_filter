PIXI.filters.BoxBlurFilter = class extends PIXI.Filter {
  constructor() {
    // Normalized座標系では左上が原点
    const vertexSrc = `
        uniform vec4 outputFrame; // フィルタの適用先の矩形(x, y, z, w)。zは幅、wは高さ。
        attribute vec2 aVertexPosition; // 0.0から1.0に正規化されたフィルタ座標（フィルタ適用先の矩形内のローカル座標）
        uniform mat3 projectionMatrix; // PixiJSのviewportからWebGLのviewportへの変換行列
        uniform vec4 inputSize; // 入力画像の横縦サイズ(x, y, z, w)。zは1/x、wは1/y。
        varying vec2 vTextureCoord; // aVertexPositionに対応する入力画像上の正規化座標
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
        precision mediump float;
        // varying:  頂点シェーダーから、フラグメントシェーダーへ転送されたデータ
        varying vec2 vTextureCoord;
        varying vec2 vBlurTexCoords[9];
        uniform sampler2D uSampler;

        void main(void) {
          // Original
          // gl_FragColor = texture2D(uSampler, vTextureCoord);

          // Box Blur
          gl_FragColor = (
            texture2D(uSampler, vBlurTexCoords[0]) +
            texture2D(uSampler, vBlurTexCoords[1]) +
            texture2D(uSampler, vBlurTexCoords[2]) +
            texture2D(uSampler, vBlurTexCoords[3]) +
            texture2D(uSampler, vBlurTexCoords[4]) +
            texture2D(uSampler, vBlurTexCoords[5]) +
            texture2D(uSampler, vBlurTexCoords[6]) +
            texture2D(uSampler, vBlurTexCoords[7]) +
            texture2D(uSampler, vBlurTexCoords[8])                         
          ) / 9.0;
        }
      `;

    super(
      vertexSrc, // vertex shader
      fragmentSrc, // fragment shader
      {} // uniforms
    );
  }
};