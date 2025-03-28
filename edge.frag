#version 300 es
precision highp float; // uInputSizeを利用する場合は highp 指定が必要

uniform vec4 uInputSize;
uniform sampler2D uTexture;
in vec2 vTextureCoord;
out vec4 fragColor;

void main(void) {
    // Edge detection
    // 周りの色が全て同じなら黒になります。
    // 周りの色の平均値よりも明るい点のみ色がつきます。
    fragColor = ((-1.0f) * texture(uTexture, vTextureCoord + vec2(-1.0f, -1.0f) * uInputSize.zw) +
        (-1.0f) * texture(uTexture, vTextureCoord + vec2(0.0f, -1.0f) * uInputSize.zw) +
        (-1.0f) * texture(uTexture, vTextureCoord + vec2(1.0f, -1.0f) * uInputSize.zw) +
        (-1.0f) * texture(uTexture, vTextureCoord + vec2(-1.0f, 0.0f) * uInputSize.zw) +
        (8.0f) * texture(uTexture, vTextureCoord + vec2(0.0f, 0.0f) * uInputSize.zw) +
        (-1.0f) * texture(uTexture, vTextureCoord + vec2(1.0f, 0.0f) * uInputSize.zw) +
        (-1.0f) * texture(uTexture, vTextureCoord + vec2(-1.0f, 1.0f) * uInputSize.zw) +
        (-1.0f) * texture(uTexture, vTextureCoord + vec2(0.0f, 1.0f) * uInputSize.zw) +
        (-1.0f) * texture(uTexture, vTextureCoord + vec2(1.0f, 1.0f) * uInputSize.zw));
}