import { defineConfig } from 'vite';
import glsl from 'vite-plugin-string';

export default defineConfig({
    plugins: [glsl()],
});

