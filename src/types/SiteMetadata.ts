export default interface SiteMetadata {
  title: string;
  author: string;
  description: string;
  tagLine: string;
  siteUrl: string;
  social: {
    twitter: string;
    gitHub: string;
    linkedIn: string;
  };
  baseUrl: string;
}
