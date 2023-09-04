import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

class WorkIndex extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={location} title={`${siteTitle}`}>
        <SEO
          title="Services"
          description="Software Developer and Performance Consultant. Helping to save your development teams time, catching bugs, and increase your customer retention. Available to work with interesting people from greenfield to archaic monolith."
          keywords={data.site.siteMetadata.defaultTags}
        />
        <div>
          <h1>Let's work together</h1>

          <p>I am a business-minded <strong>full stack engineer</strong> and <strong>solutions architect</strong> with <strong>over 7 years</strong> of professional experience. I thrive in building robust high-quality software and designing scalable cloud native solutions.</p>
          <p>Software development is complex ➿, cloud bills are sky high 💸, and bugs keep happening 🐛.</p>
          <p>Fortunately, I can help 🙋</p>

          <p>As a freelancer, I offer four types of services.</p>
          <ul>
            <li><strong>Software Development</strong>. Having been a software developer for 7+ years, I have the experience of building projects from the ground up, improving existing systems, and breaking down large systems into microservices.</li>
            <li><strong>Solutions Architecture</strong>. I can help you design and implement reliable architectures that can handle millions of customers and new features.</li>
            <li><strong>Website Performance Consultancy</strong>. This involves in-depth analysis of your website for performance and accessibility issues. Afterwards, I will work with your development team to implement the fixes.</li>
            <li><strong>DevOps and Automation</strong>. Using Infrastructure-as-code tools and CI Pipeline tools, I can save your development team time, catch bugs before your customers and create reuseable systems.</li>
          </ul>

          {/* <h2>Trusted By</h2>
          { /* List of logos */}

          {/* <h2>Working with me</h2>
          <p>I believe good design and communication is the key to solving lots of problems. Therefore, when programming I strive for <strong>simplicity</strong> and <strong>maintainability</strong>; writing code for humans rather than computers. I have a (healthy) obsession with automation so that teams have more time to do high-value work and run smoothly.</p>

          <p>I am big believer in documentation to communicate ideas, foster discussions and make decisions. Often, you will see me writing down my progress, asking for feedback, and favouring asynchronous discussions on a document rather than a synchronous meeting. </p>

          <h2>Technology and Tools</h2>
          <p>Primarily, I work in the <strong>Javascript</strong> ecosystem.</p>

          <p>My frontend technology of choice is NextJS</p>

          <p>My backend technology of choice is Node with Express</p>

          <p>AWS</p>

          <p>Design system: Tailwind</p>

          <h2>See what others say</h2>
          <div>
            <ul>
              <li>
            <p>Lorum ipsum</p>
            <span>Person A</span>
            </li>
            <li>
              <p>Lorum Ipsum</p>
              <span>Another person</span>
            </li>
            </ul>
          </div> */}

          <h2>Contact</h2>
          <p>Send me an e-mail at <strong>me@joshghent.com</strong> with a brief description of what you are looking for. We will talk about timelines, scope, budget, and make sure we&apos;re a good fit. Keep it casual! I am professional, but laid-back. I&apos;ll get back to you in 1 business day.</p>
          <p><i>I am currently based in Birmingham, UK.</i></p>
        </div>
      </Layout>
    );
  }
}

export default WorkIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }`;
