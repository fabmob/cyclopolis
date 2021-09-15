import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  font-family: Rubik, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  line-height: 1.6;
  font-size: 18px;
}

/* rubik-300 - latin */
@font-face {
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 300;
  src: local(''),
       url('/fonts/rubik-v14-latin-300.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('/fonts/rubik-v14-latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

/* rubik-regular - latin */
@font-face {
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  src: local(''),
       url('/fonts/rubik-v14-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('/fonts/rubik-v14-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

/* rubik-600 - latin */
@font-face {
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 600;
  src: local(''),
       url('/fonts/rubik-v14-latin-600.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('/fonts/rubik-v14-latin-600.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}


* {
  box-sizing: border-box;
}

a {
  color: #ae0917;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  display: block;
}
ul {

padding: 0; 

list-style-type: none

}
h1 {margin: .6rem 0 1rem}
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
