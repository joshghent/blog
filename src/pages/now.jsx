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

          <h2>What am I up to?</h2>
          <ul>
            <li>Having fun adventures in and around our home with my wife and dog, <a href="./images/wetbeard.jpeg">Millie</a></li>
            <li>Focusing on creating rather than consuming - writing, taking photos and building products</li>
            <li>Continuing to simplify</li>
            <li>Exercising, meditating and eating (mostly) vegan food</li>
          </ul>

          <h2>What are my interests?</h2>
          <ul>
            <li>Photography - particularly landscape and macro photography</li>
            <li>Reading - particularly about neurology, history, and space. <a href="https://www.goodreads.com/user/show/74204708-josh">What I'm reading</a></li>
            <li>Exercising - hiking, badminton and running. <a href="https://www.alltrails.com/members/joshua-ghent">My trekking history</a></li>
            <li>Gardening - mainly vegetables, aiming to be self-sufficient in leafy veg</li>
            <li>Formula 1</li>
            <li>Writing</li>
          </ul>

          <h2>What tech am I using</h2>
          <ul>
            <li>Laptop: Macbook Pro M1 2020</li>
            <li>Phone: iPhone 8+</li>
            <li>Stack: Although I try any technologies, I mostly use NodeJS, React and Angular</li>
            <li>You can find the setup for my machines (which are standardized) <a href="https://github.com/joshghent/dotfiles">here</a></li>
          </ul>

          <p>Last Updated 5th January 2022, from Walsall, UK</p>
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
