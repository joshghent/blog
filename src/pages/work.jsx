import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

class WorkIndex extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={location} title={`Work with me | ${siteTitle}`}>
        <SEO
          title="Work with Me"
          description="Software Developer and Performance Consultant. Helping to save your development teams time, catching bugs, and increase your customer retention. Available to work with interesting people from greenfield to archaic monolith."
          keywords={data.site.siteMetadata.defaultTags}
        />
        <div>
          <h1>Let's talk!</h1>

          <p>Working with a variety of companies from startup to enterprise, I can provide expert services and advice for your business to thrive and ship robust products.</p>
          <p>In the past, I've worked with <a href="https://york-e.com">York Press</a>, <a href="https://cappfinity.com">Cappfinity</a> and <a href="https://cloudcall.com">CloudCall</a> and many more.</p>

          <h2>Services</h2>
          <ul>
            <li><strong>Website Performance Consultancy</strong>. This involves in-depth analysis of your website for performance and accessibility issues. Afterwards, I'll work with your development team to implement the fixes. </li>
            <li><strong>Monitoring</strong>. Is your system going down all the time? Do you get random tickets with hard to find issues? I can help shed light on this by building robust monitoring interfaces for you and your team.</li>
            <li><strong>Software Development</strong>. Having been a software developer for 7+ years, I have the experience of building projects from the ground up, improving existing systems, and breaking down large systems into microservices.</li>
            <li><strong>Technical Architecture</strong>. I can help you design and implement reliable architectures that can handle millions of customers and new features.</li>
            <li><strong>DevOps and Automation</strong>. Using Infrastructure-as-code tools and CI Pipeline tools, I can save your development team time, catch bugs before your customers and create reuseable systems.</li>
          </ul>

          <h2>How it works</h2>
          <p>Get in touch <a href="mailto:me@joshghent.com">via Email (me@joshghent.com)</a> or <a href="https://calendly.com/joshghent/consultation">Book a call</a> to clarify what services you need and demonstrate what I can offer to you.</p>
          <p>Upon agreement of the quote and deliverables, we'll exchange any contracts that we need and I'll get to work!</p>
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
