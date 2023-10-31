import { Account, GithubAccount } from '@entities/account';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

export enum REQUEST_STATUSES {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}

type RequestIdle = {
  status: REQUEST_STATUSES;
  accounts: GithubAccount[];
  error: null;
  fetchData: (url: string, config?: RequestInit) => Promise<void>;
};

type RequestLoading<T> = {
  status: REQUEST_STATUSES;
  accounts: GithubAccount[];
  error: Error | null;
  fetchData: (url: string, config?: RequestInit) => Promise<void>;
};

type RequestSuccess<T> = {
  status: REQUEST_STATUSES;
  accounts: GithubAccount[]; 
  error: null;
  fetchData: (url: string, config?: RequestInit) => Promise<void>;
};

type RequestFailure = {
  status: REQUEST_STATUSES;
  accounts: [];
  error: Error;
  fetchData: (url: string, config?: RequestInit) => Promise<void>;
};

type RequestResponse<T> = RequestFailure | RequestIdle | RequestLoading<T> | RequestSuccess<T>;

export const useFetchUsers = <T>():RequestResponse<T> => {
  const [accounts, setAccounts] = useState([]);
  const [status, setStatus] = useState(REQUEST_STATUSES.IDLE);
  const [error, setError] = useState(null);
  // const [page, setPage] = useState(1);

  const fetchData = useCallback(async (url: string, config: RequestInit = {}) => {
    if (!url) {
      setStatus(REQUEST_STATUSES.IDLE);
      setAccounts([]);
      return;
    }
    setStatus(REQUEST_STATUSES.LOADING);
    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const jsonData = await response.json();
      setStatus(REQUEST_STATUSES.SUCCESS);
      setAccounts(jsonData?.items);
      setError(null);
    } catch (error) {
      if (!config?.signal?.aborted) {
        setStatus(REQUEST_STATUSES.ERROR);
        setAccounts([]);
        if (error instanceof Error) setError(error);
      }
    }
  }, []);

  return { status, accounts, error, fetchData }
};



export const  useAbortableFetch = <T = unknown>(
  url: string,
  config: Omit<RequestInit, 'signal'> = {}
) => {
  const { accounts, error, status, fetchData } = useFetchUsers<T>()
  const abortRef: MutableRefObject<AbortController | null> = useRef(null)

  useEffect(() => {
    if (abortRef.current) {
      abortRef.current.abort()
    }
    const controller = new AbortController()
    abortRef.current = controller

    fetchData(url, {...config, signal: controller.signal})
    return () => {
      controller.abort()
    }
  }, [url, fetchData])
  return { status, accounts, error, fetchData }
}


export const transformAccounts = (accounts: GithubAccount[], favouriteIds): Account[] => {
  return accounts.map((account) => {
    return {
      avatarUrl: account.avatar_url,
      githubId: account.login,
      id: account.id,
      isFavourited: favouriteIds.includes(account.id.toString())
    };
  });
};
