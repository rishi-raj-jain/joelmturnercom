// example theme with Typography.js
import { toTheme } from "@theme-ui/typography";
import wp2016 from "typography-theme-wordpress-2016";
// import noriega from "typography-theme-noriega";
import merge from "lodash/merge";

const typography = toTheme(wp2016);
console.log("typography", typography);
export default merge(typography, {
  // optional style overrides go here
  fonts: {
    body:
      "'Fira Sans', system, -apple-system, '.SFNSText-Regular', 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Lucida Grande', sans-serif",
    heading:
      "'Fira Sans', '.SFNSText-Regular', 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Lucida Grande', sans-serif",
  },
  fontSizes: ["0.833rem", "1.2rem", "1.44rem", "1.728rem", "2.074rem", "2.488rem"],
  lineHeights: {
    body: 1.55,
    heading: 1.3,
  },
  code: {
    fontFamily:
      "'Fira Code, Constantia, 'Lucida Bright', Lucidabright, 'Lucida Serif', Lucida, 'DejaVu Serif', 'Bitstream Vera Serif', 'Liberation Serif', Georgia, serif",
  },
  h1: { margin: "0 0 1.38rem", fontWeight: 400, lineHeight: 1.3 },
  h2: { margin: "3rem 0 1.38rem", fontWeight: 400, lineHeight: 1.3 },
  h3: { margin: "3rem 0 1.38rem", fontWeight: 400, lineHeight: 1.3 },
  h4: { margin: "3rem 0 1.38rem", fontWeight: 400, lineHeight: 1.3 },
  h5: { margin: "3rem 0 1.38rem", fontWeight: 400, lineHeight: 1.3 },
});
