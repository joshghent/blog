import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

class HomeIndex extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    return (
      <Layout location={location} title={siteTitle}>
        <SEO
          title="Josh Ghent"
          keywords={data.site.siteMetadata.defaultTags}
        />
        <section id="hello-world">
          <a id="about_me" />
          <h2>Hello World</h2>
          <p>I&apos;m Josh. I make robust apps for the web. I build <a href="https://turboapi.dev">TurboAPI</a> - application performance monitoring made simple. And organize <a href="https://midlandsjs.org">MidlandsJS</a>.</p>
          <p>I work with SME businesses to supercharge their website and application performance, implement strong development practises as well as designing and building scalable infrastructure in the cloud.</p>
          <p>I primarily work with NodeJS, Typescript and Python. And deploy applications to AWS with Terraform, Cloudformation or Serverless. But, I am a big fan of <Link to="/what-lang-to-learn">principle based learning</Link> so set my hand to any application I am given.</p>
          <p>If you want to work together <a href="mailto:me@joshghent.com">email me!</a></p>
          <p>Currently, I work for <a href="https://york-e.com">York Press</a> as Lead Software Engineer. In the past, I&apos;ve worked with some amazing companies such as <a href="https://cappfinity.com">Cappfinity</a> and <a href="https://cloudcall.com">CloudCall</a>.</p>
          <p>On this blog, I&apos;m documenting my learnings in software, building products and helping my clients. I use this blog as a <a href="https://fortelabs.co/blog/basboverview/">second brain</a> for reference.</p>
          <p>You can find my talks on <a href="https://speakerdeck.com/joshghent">Speakerdeck</a></p>
          <p>Here&apos;s <a href="https://github.com/joshghent/dotfiles">how I set up my computers</a> with an automated installation script to install programs, dotfiles and configurations.</p>
        </section>

        <section id="contact">
          <a id="contact" />
          <h2>Contact</h2>
          <ul style={{
            listStyleType: 'none',
            marginRight: 0,
          }}
          >
            <li>letters - <a href="mailto:me@joshghent.com">me@joshghent.com</a></li>
            <li>code - <a href="https://github.com/joshghent">joshghent</a></li>
            <li>work - <a href="https://docs.google.com/document/d/1BHEsryVDOnFv-XDYjLKrVFC2TCNgqHr9KLVM9Vul-9Y/export?format=pdf">resume.pdf</a></li>
          </ul>
        </section>

        <section id="projects">
          <a id="projects" />
          <h2>Projects</h2>
          <ul style={{
            listStyleType: 'none',
            marginRight: 0,
          }}
          >
            <li>
              <a href="https://turboapi.dev">TurboAPI</a> <br />
              I created TurboAPI after facing problems constantly rebuilding custom end-to-end monitoring and API performance tracking tools. This tool helps customers track their end-to-end application and API performance over time. These insights help them bring faster experiences to their customers to increase conversions.
            </li>
            <li>
              <a href="https://esfiddle.net/">ESFiddle</a> <br />
              Create ES6+ code snippets in your browser and share them with your friends. <a href="https://github.com/esfiddle/esfiddle">code</a>
            </li>
            <li>
              <a href="https://place.dog">PlaceDog</a> <br />
              A simple service to get cute dogs as placeholders for your websites and designs. Just add a width and height to the end of the url.
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

        <section id="posts">
          <h2>Latest Posts</h2>

          <ul style={{
            listStyleType: 'none',
            marginRight: 0,
          }}
          >

            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug;
              return (
                <li key={node.fields.slug}>
                  <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div style={{ textAlign: 'center' }}><Link style={{ fontSize: '1.25em' }} to="/archive">See All Posts</Link></div>
        </section>

        <p style={{ textAlign: 'left', fontFamily: 'monospace' }}>:wq</p>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 5) {
      edges {
        node {
          html
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }`;
