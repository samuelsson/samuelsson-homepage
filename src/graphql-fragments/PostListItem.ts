import { graphql } from 'gatsby';

export const PostListItem = graphql`
  fragment PostListItem on MdxConnection {
    totalCount
    nodes {
      excerpt(pruneLength: 240)
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        tags
        categories
        thumbnail {
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 60)
          }
        }
      }
    }
  }
`;
