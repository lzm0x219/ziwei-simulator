import { defineConfig } from "@rsbuild/core";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginReact } from "@rsbuild/plugin-react";
import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  html: {
    appIcon: {
      name: "紫微斗數",
      icons: [
        { target: "apple-touch-icon", src: "./public/apple-touch-icon.png", size: 180 },
        { target: "web-app-manifest", src: "./public/android-chrome-192x192.png", size: 192 },
        { target: "web-app-manifest", src: "./public/android-chrome-512x512.png", size: 512 },
      ],
    },
  },
  server: {
    port: 4590,
    historyApiFallback: true,
  },
  tools: {
    rspack: {
      plugins: [process.env.RSDOCTOR === "true" && new RsdoctorRspackPlugin()],
    },
  },
  plugins: [
    pluginReact(),
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
      babelLoaderOptions(opts) {
        opts.plugins?.unshift("babel-plugin-react-compiler");
      },
    }),
  ],
});
