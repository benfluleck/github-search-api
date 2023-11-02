import { Account } from "./account";

export interface Detail {
  login: string;
  avatar_url?: string;
  name: string;
  bio?: string;
  followers: number;
  following: number;
  public_repos?: number;
  html_url: string;
  id: number;
}

export interface DetailProps {
  avatarUrl?: string;
  githubId: string;
  id: string;
  fullName: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  repoCount?: number;
  htmlLink?: string;
  isFavourited: boolean;
  onClick: (account: Account) => void;
}
