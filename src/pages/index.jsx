import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

class HomeIndex extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={location} title={siteTitle}>
        <SEO
          title="Josh Ghent"
          keywords={['blog', 'gatsby', 'javascript', 'react', 'josh', 'ghent', 'josh ghent', 'leicesterjs', 'home page', 'homepage']}
        />
        <section id="hello-world">
          <h2>Hello World</h2>
          <p>I&apos;m Josh. I make robust apps for the web. I build <a href="https://turboapi.dev">TurboAPI</a> - application performance monitoring made simple. And organize <a href="https://midlandsjs.org">MidlandsJS</a></p>
          <p>You can find my talks on <a href="https://speakerdeck.com/joshghent">Speakerdeck</a></p>
          <p>If you want to work together <a href="mailto:me@joshghent.com">email me!</a></p>
        </section>

        <section id="contact">
          <h2>Contact</h2>
          <p>letters - <a href="mailto:me@joshghent.com">me@joshghent.com</a></p>
          <p>code - <a href="https://github.com/joshghent">joshghent</a></p>
          <p>work - <a href="https://docs.google.com/document/d/1BHEsryVDOnFv-XDYjLKrVFC2TCNgqHr9KLVM9Vul-9Y/export?format=pdf">resume.pdf</a></p>
        </section>

        <section id="projects">
          <h2>Projects</h2>
          <ul style={{
            listStyleType: "none"
          }}>
            <li>
              <a href="https://turboapi.dev">TurboAPI</a> <br />
                I created TurboAPI after facing problems constantly rebuilding custom end-to-end monitoring and API performance tracking tools. This tool helps customers track their end-to-end application and API performance over time. These insights help them bring faster experiences to their customers to increase conversions.
              </li>
            <li>
              <a href="https://esfiddle.net/">ESFiddle</a> <br />
                Create ES6+ code snippets in your browser and share them with your friends. <a href="https://github.com/esfiddle/esfiddle">code</a>
            </li>
            <li>
              <a href="https://timberseed.com">Timberseed</a> <br />
                Wordpress website for a recruitment company based in London.
            </li>
            <li>
              <a href="https://github.com/joshghent/lastfm-slack">LastFM 2 Slack</a> <br />
                Docker bot for posting your currently scrobbled LastFm track as your Slack Status
            </li>
          </ul>
        </section>

        <p style={{ textAlign: "left", fontFamily: "monospace" }}>:wq</p>
      </Layout>
    );
  }
}

export default HomeIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }`;
