PIXI.filters.MosaicFilter = class extends PIXI.Filter {
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
        }
    `;

    const fragmentSrc = `
        precision highp float; // outputFrame を使う場合、highp 指定が必要
        uniform vec4 outputFrame;

        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;

        void main(void) {
          // vTextureCoordは直接変更できないため別の変数へコピー
          vec2 vTC = vTextureCoord;

          float mosaicSize = 5.0;
          // スクリーン座標系へ変換
          float screenX = vTC.x * outputFrame.z;
          // 1辺がmosaicSizeの正方形の左上隅の座標
          float cornerX = floor(screenX / mosaicSize) * mosaicSize;
          // 正規化座標へ戻して代入
          vTC.x = cornerX / outputFrame.z;

          // スクリーン座標系へ変換
          float screenY = vTC.y * outputFrame.w;
          // 1辺がmosaicSizeの正方形の左上隅の座標
          float cornerY = floor(screenY / mosaicSize) * mosaicSize;
          // 正規化座標へ戻して代入
          vTC.y = cornerY / outputFrame.w;

          gl_FragColor = texture2D(uSampler, vTC);
        }
      `;

    super(
      vertexSrc,
      fragmentSrc,
      {}
    );
  }
};