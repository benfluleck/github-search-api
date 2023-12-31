import { Account, GithubAccount } from '@entities/account';
import { useEffect, useState } from 'react';

type STATUS = 'idle' | 'loading' | 'success' | 'error';

export const useFetch = <T = unknown>(url: string, config: RequestInit = {}) => {
  const [status, setStatus] = useState<STATUS>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData();
  }, [url]);

  async function fetchData() {
    if (!url) {
      setStatus('idle');
      return;
    }
    setStatus('loading');
    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const jsonData = await response.json();

      setData(jsonData);
      setStatus('success');

      setError(null);
    } catch (error) {
      if (!config?.signal?.aborted) {
        setStatus('error');
        setData(null);
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error('unknown error'));
        }
      }
    }
  }

  return {
    data,
    error,
    setData,
    status,
    isLoading: status === 'loading',
    isError: status === 'error'
  };
};

export const useGHAccounts = (url: string) => {
  const { data, error, status, isLoading, isError, setData } = useFetch<{ items: GithubAccount[] }>(
    url
  );

  const [accounts, setAccounts] = useState<GithubAccount[]>([]);

  const reset = () => {
    setData(null);
    setAccounts([]);
  };

  useEffect(() => {
    const items = data ? data.items : [];
    setAccounts((accounts) => [...accounts, ...items]);
  }, [url, data?.items?.length]);

  return { accounts, setAccounts, error, status, isLoading, isError, reset };
};

export const transformAccounts = (accounts: GithubAccount[], favouriteProfiles): Account[] => {
  return accounts.map((account) => {
    return {
      avatarUrl: account.avatar_url,
      githubId: account.login,
      id: account.id,
      isFavourited: !!favouriteProfiles[account.id]
    };
  });
};
