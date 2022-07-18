import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogPostTemplate from "../blog-post";
import { act } from "react-dom/test-utils";

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
            github: "",
            linkedin: "",
            twitter: "",
            email: "",
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
