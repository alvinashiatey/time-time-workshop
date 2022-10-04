
import path from "path";
import { defineConfig } from "vite";
import packageJson from "./package.json";

const getPackageName = () => {
    return packageJson.name;
};

const fileName: { [key: string]: string } = {
    es: `${getPackageName()}.mjs`,
    cjs: `${getPackageName()}.cjs`,
    iife: `${getPackageName()}.iife.js`,
    umd: `${getPackageName()}.umd.js`
};

module.exports = defineConfig({
    base: "./",
    build: {
        target: "esnext",
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "Tic",
            formats: ["es", "cjs", "iife", "umd"],
            fileName: (format) => fileName[format],
        },
    },
});