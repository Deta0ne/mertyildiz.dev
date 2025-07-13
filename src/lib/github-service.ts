import { graphql } from '@octokit/graphql';

export interface GitHubUser {
  name: string;
  bio: string | null;
  login: string;
  avatarUrl: string;
  url: string;
  createdAt: string;
  contributionsCollection: {
    totalCommitContributions: number;
  };
}

export interface PinnedRepository {
  id: string;
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  watchers: { totalCount: number };
  primaryLanguage: { name: string; color: string } | null;
  languages: Array<{ name: string; color: string }>;
  isPrivate: boolean;
  updatedAt: string;
}

export interface GitHubActivity {
  id: string;
  type: string;
  actor: { login: string; avatarUrl: string };
  repo: { name: string; url: string };
  payload: {
    commits?: Array<{ message: string; sha: string }>;
    ref?: string;
    ref_type?: string;
    action?: string;
  };
  created_at: string;
}

export interface GitHubProfileData {
  user: GitHubUser;
  pinnedRepositories: PinnedRepository[];
  recentActivity: GitHubActivity[];
}

const GITHUB_USERNAME = 'Deta0ne';
const GITHUB_API_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

let cachedData: GitHubProfileData | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 3600;

async function fetchGitHubActivity(): Promise<GitHubActivity[]> {
  if (!GITHUB_API_TOKEN) return [];

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_API_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'mertyildiz.dev'
        }
      }
    );

    if (!response.ok) return [];

    const data = await response.json();
    return data
      .filter((event: any) => ['PushEvent', 'CreateEvent', 'PullRequestEvent'].includes(event.type))
      .slice(0, 8)
      .map((event: any) => ({
        id: event.id,
        type: event.type,
        actor: event.actor,
        repo: event.repo,
        payload: event.payload,
        created_at: event.created_at
      }));
  } catch (error) {
    console.warn('Failed to fetch GitHub activity:', error);
    return [];
  }
}

export async function fetchGitHubProfile(): Promise<GitHubProfileData> {
  if (!GITHUB_API_TOKEN) {
    throw new Error('GITHUB_ACCESS_TOKEN environment variable required');
  }

  try {
    const [userResponse, recentActivity] = await Promise.all([
      graphql<{
        user: {
          name: string;
          bio: string | null;
          login: string;
          avatarUrl: string;
          url: string;
          createdAt: string;
          contributionsCollection: { totalCommitContributions: number };
          pinnedItems: { edges: Array<{ node: any }> };
        };
      }>(
        `
          query($username: String!) {
            user(login: $username) {
              name
              bio
              login
              avatarUrl(size: 200)
              url
              createdAt
              contributionsCollection {
                totalCommitContributions
              }
              pinnedItems(first: 6, types: REPOSITORY) {
                edges {
                  node {
                    ... on Repository {
                      id
                      name
                      description
                      url
                      homepageUrl
                      stargazerCount
                      forkCount
                      watchers { totalCount }
                      primaryLanguage { name color }
                      languages(first: 5) { nodes { name color } }
                      isPrivate
                      updatedAt
                    }
                  }
                }
              }
            }
          }
        `,
        {
          username: GITHUB_USERNAME,
          headers: { authorization: `bearer ${GITHUB_API_TOKEN}` },
        }
      ),
      fetchGitHubActivity()
    ]);

    const pinnedRepositories = userResponse.user.pinnedItems.edges.map((edge: any) => ({
      ...edge.node,
      languages: edge.node.languages.nodes || []
    }));

    return {
      user: userResponse.user,
      pinnedRepositories,
      recentActivity
    };
  } catch (error) {
    console.error('GitHub API Error:', error);
    throw new Error('Failed to fetch GitHub profile data');
  }
}

export async function getGitHubProfile(): Promise<GitHubProfileData> {
  const now = Date.now();
  
  if (cachedData && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedData;
  }

  const data = await fetchGitHubProfile();
  cachedData = data;
  cacheTimestamp = now;
  
  return data;
} 