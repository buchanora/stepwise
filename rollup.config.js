import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import ugliest from "uglify-es";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import sass from 'rollup-plugin-sass';
import stripCode from "rollup-plugin-strip-code"
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import image from 'rollup-plugin-image';
import {writeFileSync} from 'fs';
import path from 'path';

const config = {
  input: "src/index.js",
  name: "Stepwise",
  globals: {
    'react': 'React',
  },
  external: ["react", "react-transition-group", "frontflip"],
  plugins: [
    image(),
    sass({
      output(styles, styleNodes) {
        writeFileSync(path.resolve(__dirname, 'lib', 'styles.css'), styles);
      },
      insert: true,
      processor: css => postcss([autoprefixer])
        .process(css, { from: 'styles.css', to: 'styles.out.css' })
        .then(result => result.css)
    }),
    babel({
      exclude: "node_modules/**"
    }),
    resolve({
      customResolveOptions: {
        moduleDirectory: ["../../node_modules", "../"]
      }
    }),
    commonjs({
      include: /node_modules/,
      namedExports: {
        'prop-types': [
          'PropTypes'
        ]
      }
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    stripCode({
      start_comment: 'START.DEV_ONLY',
      end_comment: 'END.DEV_ONLY'
    })
  ]
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(uglify({warnings: 'verbose'}, ugliest.minify));
}

export default config;