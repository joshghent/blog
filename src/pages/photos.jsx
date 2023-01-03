/* eslint-disable jsx-a11y/anchor-has-content */
import { graphql } from "gatsby";
import React, { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";

function Photos({ data, location }) {
  const siteTitle = data.site.siteMetadata.title;
  const images = data.allFile.edges.map((x) => ({
    src: x.node.publicURL,
    key: x.node.id,
    width: x.node.childImageSharp.width,
    height: x.node.childImageSharp.height,
    nano: x.node.childImageSharp.fixed.base64,
  }));

  const [index, setIndex] = useState(-1);

  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;

  const handleClick = (i) => setIndex(i);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);

  return (
    <Layout location={location} title={`${siteTitle}`} noContainer="true">
      <SEO
        title="Photos"
        description="Photos I have taken"
        keywords={data.site.siteMetadata.defaultTags}
      />
      <div className="photo__container" style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(85),
          padding: `${rhythm(1)} ${rhythm(3 / 4)}`,
        }}>
        <Gallery
          images={images}
          onClick={handleClick}
          enableImageSelection={false}
          rowHeight={300}
        />
        {!!currentImage && (
          /* @ts-ignore */
          <Lightbox
            mainSrc={currentImage.src}
            imageTitle={currentImage.caption ?? ""}
            mainSrcThumbnail={currentImage.src}
            nextSrc={nextImage.src}
            nextSrcThumbnail={nextImage.src}
            prevSrc={prevImage.src}
            prevSrcThumbnail={prevImage.src}
            onCloseRequest={handleClose}
            onMovePrevRequest={handleMovePrev}
            onMoveNextRequest={handleMoveNext}
          />
        )}
      </div>
    </Layout>
  );
}

export default Photos;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allFile(
      sort: { fields: [modifiedTime], order: DESC }
      filter: {
        sourceInstanceName: { eq: "assets" }
        absolutePath: { regex: "/photography/" }
      }
    ) {
      edges {
        node {
          id
          extension
          absolutePath
          publicURL
          childImageSharp {
            id
            original {
              height
              width
            }
            fixed(toFormatBase64: NO_CHANGE) {
              base64
              tracedSVG
              aspectRatio
              srcWebp
              srcSetWebp
              originalName
            }
          }
        }
      }
    }
    allMarkdownRemark(filter: { frontmatter: { date: { ne: null } } }) {
      group(field: fields___year_month) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date(formatString: "DD MMMM YYYY")
              title
            }
          }
        }
      }
    }
  }
`;
