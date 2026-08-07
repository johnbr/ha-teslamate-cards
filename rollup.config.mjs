import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

// All six cards ship in a single bundle: they share the websocket client, the
// uPlot wrappers and the table/pagination component, so splitting them would
// duplicate more than it saves. One bundle is also one Lovelace resource, which
// keeps the `?v=` cache-buster in frontend.py to a single URL.
export default {
  input: "src/teslamate-cards.ts",
  output: {
    file: "custom_components/teslamate_cards/frontend/teslamate-cards.js",
    format: "es",
    sourcemap: false,
  },
  plugins: [
    nodeResolve(),
    typescript(),
    // Lit 3 requires ES2022+: terser must not downlevel class syntax
    terser({ ecma: 2022, format: { comments: false } }),
  ],
};
