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
				<main className="homepage">
					<section id="hello-world">
						<h1>/* Hello World! */</h1>
						<p>I'm Josh. I make robust apps for the web. I act as lead maintainer of <a href="https://esfiddle.net">ESFiddle</a>. And organize <a href="https://meetup.com/leicesterjs">LeicesterJS</a></p>
						<p>You can find my resume <a href="https://docs.google.com/document/d/1uHFiaZvVl1kZCLwg_EFi5SEyWQEqp-S7PGm44fkXcO4/export?format=pdf">here</a>.</p>
						<p>I write articles on various topics to do with software development <a href="https://joshghent.com/blog">here</a>.</p>
						<p>You can find my talks on <a href="https://speakerdeck.com/joshghent">Speakerdeck</a></p>
						<p>If you want to work together <a href="mailto:me@joshghent.com">email me!</a></p>
					</section>

					<section id="contact">
						<h1>/* Contact */</h1>
						<p>/mail - <a href="mailto:me@joshghent.com">me@joshghent.com</a></p>
						<p>/github - <a href="https://github.com/joshghent">joshghent</a></p>
						<p>/resume - <a href="https://docs.google.com/document/d/1uHFiaZvVl1kZCLwg_EFi5SEyWQEqp-S7PGm44fkXcO4/export?format=pdf">resume.pdf</a></p>
					</section>

					<section id="projects">
						<h1>/* Open Source Projects */</h1>
						<ul>
							<li>
								<a href="https://esfiddle.net/">ESFiddle <i>(maintainer)</i></a> <br></br>
								Create ES6+ code snippets in your browser and share them with your friends. <a href="https://github.com/esfiddle/esfiddle">code</a>
							</li>
							<li>
								<a href="https://strawpoll.joshghent.com/">Strawpoll</a> <br></br>
								Quick and easy straw poll creation tool for the masses. <a href="https://github.com/joshghent/strawpoll">code</a>
							</li>
							<li>
								<a href="https://github.com/joshghent/gifbar">GifBar</a> <br></br>
								A Mac Menu bar for find your favourite gifs
					</li>
							<li>
								<a href="https://timberseed.com">Timberseed</a> <br></br>
								Wordpress website for a recruitment company based in London. <a href="https://github.com/joshghent/timberseed">code</a>
							</li>
							<li>
								<a href="https://github.com/joshghent/lastfm-slack">LastFM 2 Slack</a> <br></br>
								Docker bot for posting your currently scrobbled LastFm track as your Slack Status
                    </li>
						</ul>
					</section>

					<p>:wq</p>
				</main>
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
