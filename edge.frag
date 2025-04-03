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
    fragColor = (-1.0f) * textureOffset(uTexture, vTextureCoord, ivec2(-1, -1)) +
        (-1.0f) * textureOffset(uTexture, vTextureCoord, ivec2(0, -1)) +
        (-1.0f) * textureOffset(uTexture, vTextureCoord, ivec2(1, -1)) +
        (-1.0f) * textureOffset(uTexture, vTextureCoord, ivec2(-1, 0)) +
        8.0f * texture(uTexture, vTextureCoord) +
        (-1.0f) * textureOffset(uTexture, vTextureCoord, ivec2(1, 0)) +
        (-1.0f) * textureOffset(uTexture, vTextureCoord, ivec2(-1, 1)) +
        (-1.0f) * textureOffset(uTexture, vTextureCoord, ivec2(0, 1)) +
        (-1.0f) * textureOffset(uTexture, vTextureCoord, ivec2(1, 1));
}