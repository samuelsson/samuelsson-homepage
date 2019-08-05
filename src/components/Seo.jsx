import React from 'react';
import * as PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

const Seo = ({ pageTitle, pageDescription, path, postSEO }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            tagLine
            author
            baseUrl
            social {
              twitter
            }
          }
        }
      }
    `
  );

  const {
    title,
    description,
    tagLine,
    author,
    baseUrl,
    social,
  } = site.siteMetadata;
  const metaDescription = pageDescription || description;
  const metaTitle = pageTitle || title;
  const metaUrl = path ? `${baseUrl}${path}` : baseUrl;
  const metaImage = `${baseUrl}/logo.png`;

  return (
    <Helmet
      title={pageTitle}
      titleTemplate={`%s | ${title}`}
      defaultTitle={`${title} | ${tagLine}`}
    >
      <html lang="en" />
      <meta name="description" content={metaDescription} />
      <meta name="image" content={metaImage} />

      <meta property="og:title" content={metaTitle} />
      <meta property="og:site_name" content={title} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={postSEO ? 'article' : 'website'} />
      <meta property="og:locale" content="en_US" />

      {postSEO && <meta property="article:author" content={author} />}
      {postSEO && (
        <meta
          property="article:published_time"
          content={new Date(postSEO.published).toISOString()}
        />
      )}
      {postSEO && postSEO.updated && (
        <meta
          property="article:modified_time"
          content={new Date(postSEO.updated).toISOString()}
        />
      )}
      {postSEO && postSEO.updated && (
        <meta
          property="og:updated_time"
          content={new Date(postSEO.updated).toISOString()}
        />
      )}
      {postSEO &&
        postSEO.tags &&
        postSEO.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={social.twitter} />
      <meta name="twitter:site" content={social.twitter} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </Helmet>
  );
};

Seo.propTypes = {
  pageTitle: PropTypes.string,
  pageDescription: PropTypes.string,
  path: PropTypes.string,
  postSEO: PropTypes.shape({
    published: PropTypes.string.isRequired,
    updated: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
};

Seo.defaultProps = {
  pageTitle: '',
  pageDescription: '',
  path: '',
  postSEO: undefined,
};

export default Seo;
