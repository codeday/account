import React from "react";
import Theme from '@codeday/topo/Theme';

export default function MyApp({ Component, pageProps }) {
  return (
    <Theme cookies={pageProps.cookies}>
      <Component {...pageProps} />
    </Theme>
  )
}