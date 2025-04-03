#version 300 es
precision mediump float;

uniform sampler2D uTexture;
in vec2 vTextureCoord;
out vec4 fragColor;

void main(void) {
    // original
    // fragColor = texture(uTexture, vTextureCoord);

    // Box Blur
    fragColor = (textureOffset(uTexture, vTextureCoord, ivec2(-1, -1)) +
        textureOffset(uTexture, vTextureCoord, ivec2(0, -1)) +
        textureOffset(uTexture, vTextureCoord, ivec2(1, -1)) +
        textureOffset(uTexture, vTextureCoord, ivec2(-1, 0)) +
        texture(uTexture, vTextureCoord) +
        textureOffset(uTexture, vTextureCoord, ivec2(1, 0)) +
        textureOffset(uTexture, vTextureCoord, ivec2(-1, 1)) +
        textureOffset(uTexture, vTextureCoord, ivec2(0, 1)) +
        textureOffset(uTexture, vTextureCoord, ivec2(1, 1))) / 9.0f;
}
