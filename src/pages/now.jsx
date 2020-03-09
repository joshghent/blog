import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import '../styles/brutal.css';

class HomeIndex extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={location} title={siteTitle}>
        <SEO
          title="Now"
          keywords={['blog', 'gatsby', 'javascript', 'react', 'josh', 'ghent', 'josh ghent', 'leicesterjs']}
        />
        <div>
          <h1>/now</h1>
          <p>Inspired by the <a href="https://nownownow.com/about">/now page movement</a>. The purpose of this page is to share what I&apos;m currently focused on.</p>

          <h2>What are my interests?</h2>
          <ul>
            <li>Cloud Architecture</li>
            <li>Infrastructure-as-code (Terraform)</li>
            <li>Self-Hosted Software</li>
            <li>Security Engineering</li>
            <li>Resiliency</li>
            <li>Automation</li>
          </ul>

          <h2>What am I up to?</h2>
          <ul>
            <li>Doing lots of DIY in my first home with my new wife</li>
            <li>I work as a Senior Software Engineer at <a href="https://cappfinity.com">Cappfinity</a></li>
            <li>Transitioning to working remotely</li>
            <li>Organizing <a href="https://meetup.com/leicesterjs">LeicesterJS</a></li>
            <li>Focusing on creating rather than consuming</li>
          </ul>

          <h2>What tech am I using</h2>
          <ul>
            <li>At work and home I use a Macbook Pro of varying years (2014 at home, 2019 at work)</li>
            <li>Primarily using Typescript and .NET Core to write new services</li>
            <li>Using AWS to deploy and host</li>
            <li>Configuring lots of bots/automations via Docker, Zapier, IFTTT, Shortcuts and a personal Slack workspace</li>
            <li>I use an iPhone 8+ as my mobile device for security and usability reasons - don&apos;t @ me</li>
            <li>I have a gaming desktop, which I seldom use and is mostly used for cord cutting services (sonarr, radarr etc)</li>
            <li>You can find the setup for my machines (which are standardized) <a href="https://github.com/joshghent/dotfiles">here</a></li>
          </ul>
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
