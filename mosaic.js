PIXI.filters.MosaicFilter = class extends PIXI.Filter {
  constructor() {
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
          vec2 screenPosition = vTC.xy * outputFrame.zw;
          // 1辺がmosaicSizeの正方形の左上隅の座標
          vec2 cornerPosition = floor(screenPosition / mosaicSize) * mosaicSize;
          // 正規化座標へ戻して代入
          vTC = cornerPosition / outputFrame.zw;
          gl_FragColor = texture2D(uSampler, vTC);
        }
      `;

    super(
      null,
      fragmentSrc,
      {}
    );
  }
};