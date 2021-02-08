import '../styles/global.css';
import Typography from 'typography';

const typography = new Typography({
  overrideThemeStyles: () => ({
    'a.gatsby-resp-image-link': {
      boxShadow: 'none',
    },
    a: {
      color: 'var(--textLink)',
    },
    // gatsby-remark-autolink-headers - don't underline when hidden
    'a.anchor': {
      boxShadow: 'none',
    },
    // gatsby-remark-autolink-headers - use theme colours for the link icon
    'a.anchor svg[aria-hidden="true"]': {
      stroke: 'var(--textLink)',
    },
    hr: {
      background: 'var(--hr)',
    },
  }),
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const { rhythm } = typography;
export const { scale } = typography;
