import { graphql } from "gatsby";

export const query = graphql`
  fragment monsters on Query {
    monster1: file(relativePath: { eq: "monster-01-headshot.png" }) {
      childImageSharp {
        fixed(width: 75) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
    }
    monster2: file(relativePath: { eq: "monster-02-headshot.png" }) {
      childImageSharp {
        fixed(width: 75) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
    }
  }
  fragment InstaNodes on InstaNode {
    id
    localFile {
      childImageSharp {
        fluid(maxWidth: 1248, maxHeight: 1248) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
  fragment inktober2017 on Query {
    inktober2017: allInstaNode(filter: { hashtags: { glob: "#ink*2017" } }, sort: { fields: timestamp, order: ASC }) {
      nodes {
        ...InstaNodes
      }
    }
  }
  fragment inktober2018 on Query {
    inktober2018: allInstaNode(filter: { hashtags: { glob: "#ink*2018" } }, sort: { fields: timestamp, order: ASC }) {
      nodes {
        ...InstaNodes
      }
    }
  }
  fragment inktober2019 on Query {
    inktober2019: allInstaNode(filter: { hashtags: { glob: "#ink*2019" } }, sort: { fields: timestamp, order: ASC }) {
      nodes {
        ...InstaNodes
      }
    }
  }
  fragment letterClash on Query {
    letterClash: allInstaNode(filter: { hashtags: { eq: "#letterclash" } }, sort: { fields: timestamp, order: ASC }) {
      nodes {
        ...InstaNodes
      }
    }
  }
  fragment joelmturner_abcs2017 on Query {
    joelmturner_abcs2017: allInstaNode(
      filter: { hashtags: { glob: "#j*2017" } }
      sort: { fields: timestamp, order: ASC }
    ) {
      nodes {
        ...InstaNodes
      }
    }
  }
  fragment featuredInsta on Query {
    featuredInsta: allInstaNode(
      filter: { hashtags: { eq: "#joelmturner_featured" } }
      sort: { fields: likes, order: DESC }
    ) {
      nodes {
        ...InstaNodes
      }
    }
  }
  fragment featuredInstaRecent on Query {
    featuredInstaRecent: allInstaNode(
      filter: { hashtags: { eq: "#joelmturner_featured" } }
      sort: { fields: likes, order: DESC }
      limit: 6
    ) {
      nodes {
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 170, maxHeight: 170) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  }
  fragment insta2016 on Query {
    insta2016: allInstaNode(
      filter: { hashtags: { eq: "#handletteredabcs_2016" } }
      sort: { fields: timestamp, order: DESC }
    ) {
      nodes {
        ...InstaNodes
      }
    }
  }
  fragment recentInsta on Query {
    recentInsta: allInstaNode(sort: { fields: timestamp, order: DESC }, limit: 18) {
      nodes {
        ...InstaNodes
      }
    }
  }
  fragment PostCard on MdxConnection {
    edges {
      node {
        frontmatter {
          title
          cover {
            childImageSharp {
              fluid(maxWidth: 731, maxHeight: 464) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
          category
          tags
        }
        childMdxBlogPost {
          excerpt(pruneLength: 150)
          slug
        }
      }
    }
  }
  fragment allBlogPosts on Query {
    allBlogPosts: allMdx(
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
      filter: { frontmatter: { draft: { eq: false } } }
    ) {
      ...PostCard
    }
  }
  fragment recentBlogPosts on Query {
    recentBlogPosts: allMdx(
      limit: 2
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
      filter: { frontmatter: { draft: { eq: false } } }
    ) {
      ...PostCard
    }
  }
`;
