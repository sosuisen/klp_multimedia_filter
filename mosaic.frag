#version 300 es
precision highp float; // uInputSizeを利用する場合は highp 指定が必要

uniform vec4 uInputSize;
uniform sampler2D uTexture;
in vec2 vTextureCoord;
out vec4 fragColor;

void main(void) {
    float mosaicSize = 5.0f;
    vec2 texelPosition = vTextureCoord.xy * uInputSize.xy;

    // 1辺がmosaicSizeテクセルの正方形の、左上隅の座標
    vec2 cornerPosition = floor(texelPosition / mosaicSize) * mosaicSize;

    // UV座標へ戻してから渡す
    fragColor = texture(uTexture, cornerPosition * uInputSize.zw);
}
