/**
 * CSS imported as a string.
 *
 * `rollup-plugin-postcss` runs with `inject: false`, so a `.css` import is the
 * stylesheet text rather than a side effect. That matters because these cards
 * render into a shadow root: a stylesheet injected into `document.head` would
 * never reach uPlot's markup. Importing it lets `unsafeCSS` place it in the
 * component's own `static styles`, and keeps it tied to the installed uPlot
 * version instead of a vendored copy that could drift.
 */
declare module "*.css" {
  const content: string;
  export default content;
}
