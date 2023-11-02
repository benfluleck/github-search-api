export interface Account {
  id: string;
  githubId: string;
  bio?: string;
  avatarUrl?: string;
  isFavourited: boolean;
}


export interface GithubAccount {
  avatar_url: string,
  login: string,
  id: string
}
