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
          title="Now"
          keywords={['blog', 'gatsby', 'javascript', 'react', 'josh', 'ghent', 'josh ghent', 'leicesterjs', 'about me', 'now page', 'now', 'derek sivers', 'now movement']}
        />
        <div>
          <h1>/now</h1>
          <p>Inspired by the <a href="https://nownownow.com/about">/now page movement</a>. The purpose of this page is to share what I&apos;m currently focused on.</p>

          <h2>What are my interests?</h2>
          <ul style={{ listStyleType: "none" }}>
            <li>Self-Hosted Software</li>
            <li>Resiliency</li>
            <li>Automation</li>
            <li>Reading - old fashioned paper books!</li>
            <li>Hiking</li>
          </ul>

          <h2>What am I up to?</h2>
          <ul style={{ listStyleType: "none" }}>
            <li>Doing lots of DIY in my first home with my new wife and playing fetch with my dog <a href="./../../content/assets/images/wetbeard.jpeg">Millie</a></li>
            <li>Focusing on creating rather than consuming</li>
            <li>Building <a href="https://turboapi.dev">TurboAPI</a></li>
            <li>Continuing to simplify</li>
          </ul>

          <h2>What tech am I using</h2>
          <ul style={{ listStyleType: "none" }}>
            <li>At work and home I use a Macbook Pro of varying years (M1 at Home, 16" at Work)</li>
            <li>Primarily using Typescript to write new services and React to write front-ends</li>
            <li>Using AWS to deploy and host</li>
            <li>Configuring lots of bots/automations via Docker, Zapier, IFTTT, Shortcuts and a personal Slack workspace</li>
            <li>I use an iPhone 8+ as my mobile device for security and usability reasons - don&apos;t @ me</li>
            <li>You can find the setup for my machines (which are standardized) <a href="https://github.com/joshghent/dotfiles">here</a></li>
          </ul>

          <p>Last Updated 7th Jan 2021, from Walsall, UK</p>
        </div>
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
