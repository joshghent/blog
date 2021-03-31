import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

class SignupForm extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
              tinyletterUrl
            }
          }
        }
      `}
        render={(data) => (
          <form
            action={`${data.site.siteMetadata.tinyletterUrl}`}
            method="post"
            target="popupwindow"
            onSubmit={() => {
              window.open(
                `${data.site.siteMetadata.tinyletterUrl}`,
                'popupwindow',
                'scrollbars=yes,width=800,height=600',
              );
              return true;
            }}
            className="SignupForm"
          >
            <h3 style={{ marginTop: 0 }}>Get notified of my new blog posts and links from around the web that help you become a better developer. Aimed at developers of all experience levels.</h3>
            <div className="Wrapper">
              <input
                aria-label="Email address"
                placeholder="Your email address will never be shared or sold"
                name="email"
                type="text"
                required
                id="tlemail"
              />
              <input type="hidden" value="1" name="embed" />
              <button type="submit"><span role="img" aria-label="love-letter">💌</span> Subscribe via Email</button>
            </div>
          </form>
        )}
      />
    );
  }
}
export default SignupForm;
