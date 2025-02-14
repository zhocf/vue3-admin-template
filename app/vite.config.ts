
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";

const pathResolve = (dir: string): any => {
    return resolve(__dirname, ".", dir)
}
const alias: Record<string, string> = {
    '@': pathResolve("src")
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    resolve: {
        alias
    },
    server: {
        host: '0.0.0.0'
    },
})
