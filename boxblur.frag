#version 300 es
precision highp float; // uInputSizeを利用する場合は highp 指定が必要

uniform vec4 uInputSize;
uniform sampler2D uTexture;
in vec2 vTextureCoord;
out vec4 fragColor;

void main(void) {
    // original
    // fragColor = texture(uTexture, vTextureCoord);

    // Box Blur
    fragColor = (texture(uTexture, vTextureCoord + vec2(-1.0f, -1.0f) * uInputSize.zw) +
        texture(uTexture, vTextureCoord + vec2(0.0f, -1.0f) * uInputSize.zw) +
        texture(uTexture, vTextureCoord + vec2(1.0f, -1.0f) * uInputSize.zw) +
        texture(uTexture, vTextureCoord + vec2(-1.0f, 0.0f) * uInputSize.zw) +
        texture(uTexture, vTextureCoord + vec2(0.0f, 0.0f) * uInputSize.zw) +
        texture(uTexture, vTextureCoord + vec2(1.0f, 0.0f) * uInputSize.zw) +
        texture(uTexture, vTextureCoord + vec2(-1.0f, 1.0f) * uInputSize.zw) +
        texture(uTexture, vTextureCoord + vec2(0.0f, 1.0f) * uInputSize.zw) +
        texture(uTexture, vTextureCoord + vec2(1.0f, 1.0f) * uInputSize.zw)) / 9.0f;
}
