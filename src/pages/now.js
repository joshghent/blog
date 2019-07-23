import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import "../styles/brutal.css";

class HomeIndex extends React.Component {
	render() {
		const { data } = this.props
		const siteTitle = data.site.siteMetadata.title

		return (
			<Layout location={this.props.location} title={siteTitle}>
				<div>
					<h1>/now</h1>
					<p>Inspired by the <a href="https://nownownow.com/about">/now page movement</a>. The purpose of this page is to share what I'm currently focused on.</p>

					<h2>What am I up to?</h2>
					<ul>
						<li>Buying my first house</li>
						<li>Getting married!</li>
						<li>Organizing <a href="https://meetup.com/leicesterjs">LeicesterJS</a></li>
						<li>Learning about Cloud Architecture and Software Design Patterns</li>
					</ul>

					<h2>What tech am I using</h2>
					<ul>
						<li>I work as a Senior Software Engineer at Capp & Co.</li>
						<li>At work and home I use a Macbook Pro of varying years (2014 at home, 2017 at work)</li>
						<li>Primarily using Typescript and .NET Core to write new services</li>
						<li>Using AWS to deploy and host</li>
						<li>Configuring lots of bots/automations via Docker, Zapier, IFTTT and a personal Slack workspace</li>
						<li>I use an iPhone 8+ as my mobile device for security and usability reasons - don't @ me</li>
						<li>I have a gaming desktop, which I seldom use and is mostly used for cord cutting services (sonarr, radarr etc)</li>
					</ul>
				</div>
			</Layout>
		)
	}
}

export default HomeIndex

export const pageQuery = graphql`
  query {
		site {
			siteMetadata {
				title
			}
		}
	}`
