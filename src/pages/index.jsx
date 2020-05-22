import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import '../styles/brutal.css';
import { rhythm } from '../utils/typography';

class HomeIndex extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={location} title={siteTitle}>
        <SEO
          title="Josh Ghent"
          keywords={['blog', 'gatsby', 'javascript', 'react', 'josh', 'ghent', 'josh ghent', 'leicesterjs']}
        />
        <main className="homepage">
          <section className="header" style={{ padding: `${rhythm(1.5)} ${rhythm(6)}` }}>
            <p>
              Hey! <span role="img" aria-label="waving hand">👋</span> My name is Josh Ghent. I'm a Developer from the UK. I help companies reign in their AWS Bills and make the web more resilient for all. I am creator of <a href="https://turboapi.dev">TurboAPI</a> and <a href="https://leicesterjs.org">LeicesterJS</a>.
              I also built <a href="https://esfiddle.net">ESFiddle</a>, <a href="https://github.com/joshghent/gifbar">GifBar</a> and <a href="https://github.com/joshghent">more</a>.
            </p>
          </section>
          <section className="triangle" />
          <section className="cta" style={{ padding: `${rhythm(1.5)} ${rhythm(3)}` }}>
            <p>AWS Bills making you sweat?</p>
            <p>Developers fearing their on-call shift?</p>
            <p>Mind-numbing manual work when things go wrong?</p>

            <p>I can help cut your cloud costs and save your developers time</p>
            <p>Share your stories of despair <span role="img" aria-label="mail-icon">💌</span> <a className="email-address" href="mailto:me@joshghent.com?subject=Why does nothing work?">me@joshghent.com</a></p>
          </section>
        </main>
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
