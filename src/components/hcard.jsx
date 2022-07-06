import { Link, useStaticQuery, graphql } from 'gatsby';
import React from 'react';

class HCard extends React.Component {
  render() {
    const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          author
          description
          company {
            name
            url
          }
          siteUrl
          social {
            github
            linkedin
            twitter
            email
          }
        }
      }
    }`);
    const meta = data.site.siteMetadata;
    return (
      <div className="h-card" style={{ display: 'none' }}>
        <Link to="/" className="u-url">{meta.author}</Link>
        <span className="p-name">Josh Ghent</span>
        <span className="p-given-name">Josh</span>
        <span className="p-family-name">Ghent</span>
        <a className="p-org h-card" href={meta.company.url}>{meta.company.name}</a>
        <a className="u-email h-card" href={`mailto:${meta.social.email}`}>{meta.social.email}</a>
        <img className="u-photo" src="./images/avatar.jpg" alt="avatar" />
        <p className="p-note">Freelance software engineer with over 8 years experience - specializing in web performance and robust infrastructure. Love hiking with my wife and dog (Millie). Urban design enthusiest.</p>
        <p className="p-job-title">Director of Turbo Technologies</p>
        <p className="p-category">Software Engineer</p>

        <a href={`https://twitter.com/${meta.social.twitter}`} rel="me">@{meta.social.twitter} on Twitter</a>
        <a href={`https://github.com/${meta.social.github}`} rel="me">Github</a>
        <a href={`mailto:${meta.social.email}`} rel="me">{meta.social.email}</a>
      </div>
    );
  }
}

export default HCard;
