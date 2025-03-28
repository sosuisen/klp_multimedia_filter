precision highp float; // uInputSizeを利用する場合は highp 指定が必要

uniform vec4 uInputSize;
uniform sampler2D uTexture;
varying vec2 vTextureCoord;

void main(void) {
    // original
    // gl_FragColor = texture2D(uTexture, vTextureCoord);

    // Box Blur
    gl_FragColor = (texture2D(uTexture, vTextureCoord + vec2(-1.0, -1.0) * uInputSize.zw) +
        texture2D(uTexture, vTextureCoord + vec2(0.0, -1.0) * uInputSize.zw) +
        texture2D(uTexture, vTextureCoord + vec2(1.0, -1.0) * uInputSize.zw) +
        texture2D(uTexture, vTextureCoord + vec2(-1.0, 0.0) * uInputSize.zw) +
        texture2D(uTexture, vTextureCoord + vec2(0.0, 0.0) * uInputSize.zw) +
        texture2D(uTexture, vTextureCoord + vec2(1.0, 0.0) * uInputSize.zw) +
        texture2D(uTexture, vTextureCoord + vec2(-1.0, 1.0) * uInputSize.zw) +
        texture2D(uTexture, vTextureCoord + vec2(0.0, 1.0) * uInputSize.zw) +
        texture2D(uTexture, vTextureCoord + vec2(1.0, 1.0) * uInputSize.zw)) / 9.0;
}