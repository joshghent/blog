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
          <section className="header" style={{ padding: '4vw 2vw' }}>
            <p>
              Hey! <span role="img" aria-label="waving hand">👋</span> My name is Josh Ghent. I'm a Developer from the UK. I help companies reign in their AWS Bills and make the web more resilient for all. I am creator of <a href="https://turboapi.dev">TurboAPI</a> and <a href="https://leicesterjs.org">LeicesterJS</a>.
              I also built <a href="https://esfiddle.net">ESFiddle</a>, <a href="https://github.com/joshghent/gifbar">GifBar</a> and <a href="https://github.com/joshghent">more</a>.
            </p>
          </section>
          <section className="triangle" />
          <section className="cta" style={{ padding: `${rhythm(1.5)} ${rhythm(3)}` }}>
            <div className="row">
              <div className="left">
                <p>AWS Bills making you sweat?</p>
                <p>Developers fearing their on-call shift?</p>
                <p>Mind-numbing manual work when things go wrong?</p>
              </div>

              <div className="right mailbox">
                <p>I can help cut your cloud costs and save your developers time</p>
                <p>Share your stories of despair <span role="img" aria-label="mail-icon">💌</span> <a className="email-address" href="mailto:me@joshghent.com?subject=Why does nothing work?">me@joshghent.com</a></p>
              </div>
            </div>
          </section>
          <section className="services">
            <div className="bills">
              <h1>Lowering your AWS Bills</h1>
              <p>No one likes big bills, least of all when you're not sure where they came from. I can help by diving into your infrastructure and producing a comprehensive and actionable report to help you lower you bill by 20% or more.</p>
              <p>You might feel like your AWS Bill is like a black hole, not sure what's in there and will probably hurt you if you go near it - with my in-depth analysis I will guarantee to save you far more than AWS rightsizing recommendations or any other infrastructure analysis tool.</p>
              <p>You can get the peace of mind of knowing what your paying for and why you're paying for it. Most importantly, we help you scale your business whilst flat-lining your bill.</p>
            </div>
            <div className="resiliency">
              <h1>Make your platform rock solid</h1>
              <p>Early on, resiliency and scaling are an after thought for us all. But as your business grows, people complain, developers tear their hair out and everyone is left unhappy.</p>
              <p>I can help you make your new or existing platform more resilient with my years of experience building systems integrated with hundreds of third parties.</p>
              <p>I will mentor your developers to become resiliency rockstars so you can build and maintain a solid platform.</p>
            </div>
            <div className="automation">
              <h1>Automation - less Terminator, more Wall-E</h1>
              <p>Ever feel like you've done this same task over and over again? Or do hear your developers complain how difficult releasing new builds is? Or how long it takes?</p>
              <p>I can provide the expertise to automate your software testing and delivery pipelines. Saving thousands of hours of manual QA time whilst increasing developer productivity.</p>
              <p>Software testing and continuous integration can often seem inaccessible and expensive, but with my guidance your business can ship quality product, faster.</p>
            </div>
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
