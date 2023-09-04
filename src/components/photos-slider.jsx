/* eslint-disable */
import { graphql, StaticQuery } from "gatsby";
import React from "react";

export const PhotoSlider = ({ limit = 5 }) => {
  return (
    <StaticQuery
      query={graphql`
        query PhotosQuery {
          allFile(
            sort: { fields: [modifiedTime], order: DESC }
            filter: {
              sourceInstanceName: { eq: "assets" }
              absolutePath: { regex: "/photography/" }
            }
            limit: 5
          ) {
            edges {
              node {
                id
                extension
                absolutePath
                publicURL
              }
            }
          }
        }
      `}
      render={(data) => {
        return (
          <div className="photo--scroll">
            {data.allFile.edges.map(({ node }) => {
              return (
                // TODO: Change to gatsby image for better performance
                <a href={node.publicURL}>
                  <img src={node.publicURL} loading="lazy" />
                </a>
              );
            })}
          </div>
        );
      }}
    />
  );
};

export default PhotoSlider;
