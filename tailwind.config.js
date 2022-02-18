const _ = require('lodash');
const modularScale = require('modularscale-js');
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

const ms = n => modularScale(n, { base: [18, 1140, 12], ratio: 1.3 });
const mapColor = color => _.fromPairs(_.values(color).map((val, index) => [(index + 1) * 10, val]));

module.exports = {
  content: ['src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontSize: _.mapValues(
      _.mapKeys(_.range(-4, 9), val => val),
      val => _.round(ms(val), 4) + 'px'
    ),
    colors: {
      amber: mapColor(colors.amber),
      black: colors.black,
      blue: mapColor(colors.blue),
      current: 'currentColor',
      cyan: mapColor(colors.cyan),
      fuchsia: mapColor(colors.fuchsia),
      gray: mapColor(colors.stone),
      green: mapColor(colors.emerald),
      indigo: mapColor(colors.indigo),
      lime: mapColor(colors.lime),
      orange: mapColor(colors.orange),
      pink: mapColor(colors.pink),
      purple: mapColor(colors.purple),
      red: mapColor(colors.red),
      rose: mapColor(colors.rose),
      sky: mapColor(colors.sky),
      teal: mapColor(colors.teal),
      transparent: 'transparent',
      violet: mapColor(colors.violet),
      white: colors.white,
      yellow: mapColor(colors.yellow),
    },
    boxShadow: {
      none: 'none',
      10: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      20: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      30: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      40: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      50: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      60: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      70: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    },
    extend: {
      fontFamily: {
        sans: ['Inter var'].concat(defaultTheme.fontFamily.sans),
      },
      animation: {
        blink: '1s blink infinite',
      },
      keyframes: {
        blink: {
          '50%': { opacity: 0 },
        },
      },
      padding: theme => theme('width'),
      maxWidth: theme => theme('spacing'),
      minWidth: theme => theme('spacing'),
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    plugin(function Grid({ addComponents, theme }) {
      addComponents({
        '.row': {
          display: 'flex',
          flexWrap: 'wrap',
          margin: '-' + theme('margin.4'),
        },
        '.container': {
          position: 'relative',
          width: '100%',
          maxWidth: 1200,
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('padding')['6'],
          paddingRight: theme('padding')['6'],
          '&--fluid': {
            maxWidth: '100%',
          },
        },
      });

      addComponents(
        [
          {
            '.col': {
              position: 'relative',
              padding: theme('padding')['4'],
            },
            '.col--auto': {
              width: 'auto',
              maxWidth: '100%',
              flex: '0 0 auto',
            },
            '.col--grow': {
              width: '100%',
              maxWidth: '100%',
              flexGrow: 1,
              flexBasis: 0,
            },
          },
          ..._.range(1, 13).map((val, index, { length }) => ({
            [`.col--${val}`]: {
              width: '100%',
              maxWidth: `${(val / length) * 100}%`,
              flex: `0 0 ${(val / length) * 100}%`,
            },
          })),
          ..._.range(0, 12).map((val, index, { length }) => ({
            [`.offset--${val}`]: {
              marginLeft: `${(val / length) * 100}%`,
            },
          })),
        ],
        ['responsive']
      );
    }),
  ],
};
