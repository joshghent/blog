import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

class HomeIndex extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={location} title={`Now | ${siteTitle}`}>
        <SEO
          title="Now"
          description="Josh Ghent's Now Page - What's going on in my life right now and what I'm working on"
          keywords={data.site.siteMetadata.defaultTags}
        />
        <div>
          <h1>/now</h1>
          <p>Inspired by the <a href="https://nownownow.com/about">/now page movement</a>. The purpose of this page is to share what I&apos;m currently focused on.</p>

          <h2>What are my interests?</h2>
          <ul>
            <li>Travel</li>
            <li>Photography - particularly landscape and macro photography</li>
            <li>Self-Hosted Software</li>
            <li>Automation</li>
            <li>Reading - particularly about Neurology, History, and Space. You can find <a href="https://www.goodreads.com/user/show/74204708-josh">what I'm reading here</a></li>
            <li>Hiking - Find <a href="https://www.alltrails.com/members/joshua-ghent">my trekking history here</a></li>
            <li>Gardening - mainly vegetables, aiming to be self-sufficient in leafy veg</li>
            <li>Running</li>
            <li>Formula 1</li>
            <li>Writing</li>
            <li>Cooking</li>
          </ul>

          <h2>What am I up to?</h2>
          <ul>
            <li>Having fun adventures in and around our home with my wife and dog, <a href="./images/wetbeard.jpeg">Millie</a></li>
            <li>Focusing on creating rather than consuming</li>
            <li>Continuing to simplify</li>
          </ul>

          <h2>What tech am I using</h2>
          <ul>
            <li>At work and home I use a Macbook Pro M1 2020</li>
            <li>Primarily using Typescript to write new services and React to write front-ends</li>
            <li>Using AWS to deploy and host</li>
            <li>Configuring lots of bots/automations via Docker, Zapier, IFTTT, Shortcuts and a personal Slack workspace</li>
            <li>I use an iPhone 8+ as my mobile device for security and usability reasons - don&apos;t @ me</li>
            <li>You can find the setup for my machines (which are standardized) <a href="https://github.com/joshghent/dotfiles">here</a></li>
          </ul>

          <p>Last Updated 8th November 2021, from Walsall, UK</p>
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
