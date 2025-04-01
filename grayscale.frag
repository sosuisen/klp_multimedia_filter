#version 300 es
precision mediump float;

uniform sampler2D uSampler;
in vec2 vTextureCoord;
out vec4 fragColor;

void main(void) {
    vec4 color = texture(uSampler, vTextureCoord);

    // colorの値を明るさ情報のみ（グレースケール）へ変換
    float gray = color.r * 0.2126f + color.g * 0.7152f + color.b * 0.0722f;
    color.r = color.g = color.b = gray;

    fragColor = color;
}