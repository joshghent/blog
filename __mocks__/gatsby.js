const React = require("react");
const gatsby = jest.requireActual("gatsby");
module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest
    .fn()
    .mockImplementation(
      ({
        activeClassName,
        activeStyle,
        getProps,
        innerRef,
        partiallyActive,
        ref,
        replace,
        to,
        ...rest
      }) =>
        React.createElement("a", {
          ...rest,
          href: to,
        })
    ),
  // +++ ADD MOCK NAVIGATE FUNCTION HERE +++
  navigate: jest.fn(),
  useStaticQuery: jest.fn().mockImplementation(() => {
    // When component calls useStaticQuery(...), this result will be returned
    return {
      site: {
        siteMetadata: {
          defaultTitle: "Jane Doe Blog",
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
  }),
};
