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

          <h2>About me</h2>
          <p>Hi! My name is Josh. I am a freelance software engineer and SRE. I love building resilient systems that delight people. So, I think a lot about design, intuitive systems and cognative biases</p>

          <h2>What am I up to?</h2>
          <ul>
            <li>Having fun adventures in and around our home with my wife and dog, <a href="https://joshghent.com/images/wetbeard.jpeg">Millie</a></li>
            <li>Focusing on creating rather than consuming - writing, taking photos and building products</li>
            <li>Continuing to simplify</li>
            <li>Exercising, meditating and eating (mostly) vegan food</li>
            <li>Studying Italian.</li>
          </ul>

          <hr className="section-break" />

          <h2>What are my interests?</h2>
          <p>Things I&apos;m reading about and want to know more about.</p>
          <ul>
            <li>Photography. Particularly landscape and macro photography.</li>
            <li>Reading - particularly about neurology, history, and space. <a href="https://www.goodreads.com/user/show/74204708-josh">What I&apos;m reading</a>.</li>
            <li>Exercising - hiking, badminton and running. <a href="https://www.alltrails.com/members/joshua-ghent">My trekking history</a>.</li>
            <li>Gardening - mainly vegetables, aiming to be self-sufficient in leafy vegetables.</li>
            <li>Formula 1.</li>
            <li>Writing.</li>
            <li>Urban Planning.</li>
            <li>Cooking.</li>
            <li>Linguistics.</li>
            <li>Psychology.</li>
            <li>Advanced health optimization.</li>
            <li>The design of everyday things.</li>
            <li>IndieWeb.</li>
          </ul>

          <hr className="section-break" />

          <h2>What tech am I using</h2>
          <ul>
            <li>Laptop: Macbook Pro M1 2020</li>
            <li>Phone: iPhone 8+</li>
            <li>Stack: Although I try any technologies, I mostly use NodeJS, React and Angular</li>
            <li>You can find the setup for my machines (which are standardized) <a href="https://github.com/joshghent/dotfiles">here</a></li>
          </ul>

          <hr className="section-break" />

          <h2>Strong opinions, weakly held</h2>
          <ul>
            <li>News is an unnecessary resource</li>
            <li>Good health is simple. Water, Sleep, Exercise</li>
            <li>Society would be much better with radical honesty</li>
            <li>Principles are much more valuable than </li>
            <li>Modern school is unequipped for a world with instant access to information</li>
            <li>Modern schooling is unequipped for teaching people to live outside of standard devisasion.</li>
            <li>Good design could solve a variety of social issues.</li>
          </ul>

          <hr className="section-break" />

          <h2>My blog is my brain</h2>
          <blockquote>I believe that reading and writing are the most nourishing forms of meditation anyone has so far found. - Kurt Vonnegut</blockquote>
          <p>I strongly resonate with Vonneguts thoughts on writing. I believe that writing about a topic is powerful tool for learning. So, this blog is a record of things I have learned or been thinking deeply about. Largely, I write for myself. Although I love the idea that other people read my writing, the words are meant to capture my mind at a certain point in time. I can then travel back in time by reviewing the archive of this page.</p>

          <p>Last Updated 26th July 2022, from Walsall, UK</p>
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
