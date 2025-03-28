precision highp float; // uInputSizeを利用する場合は highp 指定が必要

uniform vec4 uInputSize;
uniform sampler2D uTexture;
varying vec2 vTextureCoord;

void main(void) {
    // Edge detection
    // 周りの色が全て同じなら黒になります。
    // 周りの色の平均値よりも明るい点のみ色がつきます。
    gl_FragColor = ((-1.0) * texture2D(uTexture, vTextureCoord + vec2(-1.0, -1.0) * uInputSize.zw) +
        (-1.0) * texture2D(uTexture, vTextureCoord + vec2(0.0, -1.0) * uInputSize.zw) +
        (-1.0) * texture2D(uTexture, vTextureCoord + vec2(1.0, -1.0) * uInputSize.zw) +
        (-1.0) * texture2D(uTexture, vTextureCoord + vec2(-1.0, 0.0) * uInputSize.zw) +
        (8.0) * texture2D(uTexture, vTextureCoord + vec2(0.0, 0.0) * uInputSize.zw) +
        (-1.0) * texture2D(uTexture, vTextureCoord + vec2(1.0, 0.0) * uInputSize.zw) +
        (-1.0) * texture2D(uTexture, vTextureCoord + vec2(-1.0, 1.0) * uInputSize.zw) +
        (-1.0) * texture2D(uTexture, vTextureCoord + vec2(0.0, 1.0) * uInputSize.zw) +
        (-1.0) * texture2D(uTexture, vTextureCoord + vec2(1.0, 1.0) * uInputSize.zw));
}