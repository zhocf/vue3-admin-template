import {defineConfig} from 'vite';
import path from 'path';

// Vite 配置
export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'), // 主入口文件
            name: 'zbm',
            fileName: (format) => `index.${format}.js`, // 输出的文件名
            formats: ['es', 'cjs'], // 支持 ES 和 CommonJS 格式
        },
        rollupOptions: {
            external: ['@zbm/store', '@zbm/utils'], // 外部依赖，避免被打包
            output: {
                globals: {
                    '@zbm/store': 'store',
                    '@zbm/utils': 'utils',
                },
            },
        },
    },
});
