/* eslint-disable jsx-a11y/html-has-lang */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="title" content="Josh Ghent — Developer Musings" />
        <meta name="description" content="Developer Musings, the personal website and blog of Josh Ghent. Building of TurboAPI" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://joshghent.com/" />
        <meta property="og:title" content="Josh Ghent — Developer Musings" />
        <meta property="og:description" content="Developer Musings, the personal website and blog of Josh Ghent. Building of TurboAPI" />
        <meta property="og:image" content="./images/icon.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://joshghent.com/" />
        <meta property="twitter:title" content="Josh Ghent — Developer Musings" />
        <meta property="twitter:description" content="Developer Musings, the personal website and blog of Josh Ghent. Building of TurboAPI" />
        <meta property="twitter:image" content="./images/icon.png" />

        <link rel="webmention" href="https://webmention.io/joshghent.com/webmention" />
        <link rel="pingback" href="https://webmention.io/joshghent.com/xmlrpc" />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key="body"
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}
