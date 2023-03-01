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
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;

        void main(void) {
          gl_FragColor = texture2D(uSampler, vTextureCoord);
        }
      `;

    super(
      vertexSrc,
      fragmentSrc,
      {}
    );
  }
};