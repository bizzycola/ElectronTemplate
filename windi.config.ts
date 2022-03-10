import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'
import typography from 'windicss/plugin/typography'
import forms from 'windicss/plugin/forms'

export default defineConfig({
  darkMode: 'class',
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: true,

  plugins: [
    typography(),
    forms,
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
      },
      colors: {
        deployr: {
          100: '#fffffe',
          200: '#929292',
          300: '#88888a',
          400: '#3e3d43',
          500: '#2b2b37',
          600: '#22222c',
          700: '#171721',
          800: '#14141c',
          900: '#12121a',
        },
        counterly: {
          'logo': '#35C581',
          'logo-light': '#39d68d',
          'logo-lighter': '#42fca5',
        },
        blurple: {
          100: '8699db',
          200: '#7289da',
          300: '#5f7ad9',
        },
        twitch: {
          100: '#6441a5',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              'color': 'inherit',
              'opacity': 0.75,
              'fontWeight': '500',
              'textDecoration': 'underline',
              '&:hover': {
                opacity: 1,
                color: colors.teal[600],
              },
            },
            b: { color: 'inherit' },
            strong: { color: 'inherit' },
            em: { color: 'inherit' },
            h1: { color: 'inherit' },
            h2: { color: 'inherit' },
            h3: { color: 'inherit' },
            h4: { color: 'inherit' },
            code: { color: 'inherit' },
          },
        },
      },
    },
  },
})
