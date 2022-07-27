/* eslint-disable react/jsx-filename-extension */
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import BlogPostTemplate from "../blog-post";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe("BlogPostTemplate", () => {
  it("Renders in layout", () => {
    // An example of what the graphql query used by the Post template returns:
    const postData = {
      markdownRemark: {
        fields: {
          slug: "/test-post",
        },
        frontmatter: {
          date: "14 Aug 2021",
          title: "This is the title",
        },
        html: "<p>Here is the first paragraph</p><h2>Sub Heading</h2><p>And another paragraph</p>",
      },
      site: {
        siteMetadata: {
          title: "Jane Doe Blog",
          titleTemplate: "%s · Jane Doe",
          defaultDescription: "Blog description.",
          siteUrl: "https://someblog.com",
          defaultImage: "/images/profile.png",
          company: {
            name: "Turbo Technologies",
            url: "https://joshghent.com",
          },
          social: {
            github: "joshghent",
            linkedin: "https://linkedin.com/in/joshghent",
            twitter: "joshghent",
            email: "me@joshghent.com",
          },
        },
      },
    };
    // Render the template with the data prop to mimic graphql passing results to it:
    const container = render(
      <BlogPostTemplate
        data={postData}
        location={{ pathname: "/test-post" }}
        pageContext={{}}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
