import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

interface PostSeo {
  published: string;
  updated?: string;
  tags?: string[];
}

type SeoProps = {
  pageTitle?: string;
  pageDescription?: string;
  path?: string;
  postSEO?: PostSeo;
};

const siteMetadataQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        tagLine
        author
        baseUrl
      }
    }
  }
`;

const Seo = ({
  pageTitle,
  pageDescription,
  path,
  postSEO,
}: SeoProps): JSX.Element => {
  const { site } = useStaticQuery(siteMetadataQuery);

  const { title, description, tagLine, author, baseUrl } = site.siteMetadata;
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
      {postSEO?.published && (
        <meta
          property="article:published_time"
          content={new Date(postSEO.published).toISOString()}
        />
      )}
      {postSEO?.updated && (
        <>
          <meta
            property="article:modified_time"
            content={new Date(postSEO.updated).toISOString()}
          />
          <meta
            property="og:updated_time"
            content={new Date(postSEO.updated).toISOString()}
          />
        </>
      )}
      {postSEO?.tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
    </Helmet>
  );
};

export default Seo;
