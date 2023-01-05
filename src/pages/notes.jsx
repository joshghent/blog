/* eslint-disable jsx-a11y/anchor-has-content */
import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

function Notes({location}) {
  return (<StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              title
            }
          }
          notes: allMarkdownRemark(
            sort: {fields: [frontmatter___date], order: DESC}
            filter: {frontmatter: {date: {ne: null}}, fileAbsolutePath: {regex: "/notes/"}}
          ) {
            edges {
              node {
                id
                html
                fields {
                  slug
                }
                frontmatter {
                  date(formatString: "do MMMM YYYY")
                  keyDate: date(formatString: "YYYY-MM-DDTHH:MM")
                }
                fileAbsolutePath
              }
            }
          }
        }
      `}
      render={(data) => (
        <Layout location={location} title={`${data.site.siteMetadata.title}`}>
          <SEO
            title="Notes"
            description="My own personal Twitter"
            keywords={data.site.siteMetadata.defaultTags}
          />
          <h1>Notes</h1>
          <span>Kinda like my own personal twitter.</span>

          <ul className="notes--list">
            {data.notes.edges.map(({ node }) => (
                <li className="note--item" key={node.frontmatter.keyDate} id={node.frontmatter.keyDate}>
                  <a href={`#${node.frontmatter.keyDate}`}><span className="note--date"><span className="note--target" />{node.frontmatter.date} #</span></a>
                  <p className="note--content" dangerouslySetInnerHTML={{ __html: node.html }}/>
                </li>
              ))}
          </ul>
        </Layout>

        )}
    />)
  }

export default Notes;
