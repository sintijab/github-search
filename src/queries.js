import gql from 'graphql-tag';

export const GET_REPOSITORY = gql`
  query getRepositoryByName($name: String!) {
      repository(owner:"gatsbyjs", name: $name) {
        id,
        name,
        owner {
          id,
          avatarUrl
        },
        forkCount,
        watchers {
          totalCount
        },
        stargazers {
          totalCount
        }
      }
    }
`;
