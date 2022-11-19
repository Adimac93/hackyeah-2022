import { defineConfig, configDefaults } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
    plugins: [svelte({ hot: !process.env.VITEST })],
    test: {
        // Jest like globals
        globals: true,
        environment: "node",
        include: ["tests/unit/**/*.{test,spec}.ts", "src/**/*.{test,spec}.ts"],
    },
});
