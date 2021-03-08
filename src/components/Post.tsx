/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { memo, ReactNode } from "react";
import { FC } from "react";
import PostSeries from "./postSeries";
import Layout from "./layout";
import SEO from "./seo";
import Flexbox from "./flexbox";
import Link from "./link";
import { usePostSeries } from "../hooks";
import { slugify } from "../utils/utils";
import { PostNav } from "./postNav";
import { ExternalLink } from "./ExternalLink";

type PostNavProps = {
  frontmatter: {
    slug: string;
    title: string;
  };
};

type PostProps = {
  children: ReactNode | ReactNode[];
  excerpt: string;
  frontmatter: {
    title?: string;
    tags?: string[];
    category?: string;
    series?: string;
    order?: number;
    cover?: {
      publicURL: string;
    };
  };
  slug: string;
  pageContext: {
    postsInSeries?: { title: string; slug: string }[];
  };
  data: {
    previous?: PostNavProps;
    next?: PostNavProps;
  };
  body: any;
};

const Post: FC<PostProps> = ({
  frontmatter: { cover, title, tags, category = "", series = "", order = 0 } = {},
  children,
  excerpt,
  data: { previous, next } = {},
  slug,
}) => {
  const postsInSeries = usePostSeries(series);
  const siteBaseUrl = "https://joelmturner.com";

  return (
    <Layout sx={{ variant: "post" }}>
      <SEO title={title} description={excerpt} image={cover && cover.publicURL} />
      <Styled.h1>{title}</Styled.h1>
      <PostSeries series={series} order={order} postsInSeries={postsInSeries} />

      <article>{children}</article>

      <Flexbox vertical sx={{ mt: 4, borderTop: "1px solid", borderColor: "muted", py: 3 }}>
        {category && (
          <Flexbox gap={1}>
            <span sx={{ fontWeight: "normal" }}>Category</span>
            <Link to={slugify(category, `/blog/category`)} sx={{ fontWeight: "normal", variant: "link" }}>
              <span sx={{ variant: "link" }}>{category}</span>
            </Link>
          </Flexbox>
        )}

        {tags && (
          <Flexbox gap={1} sx={{ mb: 3 }}>
            <span sx={{ fontWeight: "normal" }}>Tags: </span>
            {tags.map((tag) => (
              <Link key={tag} to={slugify(tag, `/blog/tag`)} sx={{ fontWeight: "normal", variant: "link" }}>
                <span sx={{ variant: "link" }}>{tag}</span>
              </Link>
            ))}
          </Flexbox>
        )}

        <PostNav slug={slug} />
      </Flexbox>

      <Flexbox vertical gap right>
        <span sx={{ color: "gray" }}>
          <ExternalLink
            href={`https://mobile.twitter.com/search?q=${encodeURI(siteBaseUrl + "/blog/" + slug)}`}
            title="Twitter discussion"
          >
            Discuss this article on Twitter
          </ExternalLink>
        </span>
      </Flexbox>
    </Layout>
  );
};

export default memo(Post);
