import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORY } from './queries';
import {
  WELCOME_TEXT,
  LAST_SEARCH_TEXT,
  BUTTON_TEXT_REMOVE,
  REPO_URL,
  LOADING_STATE_TEXT,
  FORK_TITLE,
  WATCHERS_TITLE,
  STARGRAZERS_TITLE,
} from './constants';
import './index.css';

const getRepoItem = (data = {}, i = '', onRemove) => {
  const {
    id = '',
    name = '',
    owner: {
      avatarUrl = '',
    },
    forkCount = null,
    watchers: {
      totalCount: watchersCount = null,
    },
    stargazers: {
      totalCount: stargazersCount = null,
    }
  } = data;

  return (
    <div className="repo" key={`${name}${i}`}>
      <div className="repo-header">
        <img className="repo-img" alt={name} src={avatarUrl} />
        <b className="repo-title">{name}</b>
      </div>
      <div className="repo-details">
        <span className="repo-text">{`${FORK_TITLE}: ${forkCount}`}</span>
        <span className="repo-text">{`${WATCHERS_TITLE}: ${watchersCount}`}</span>
        <span className="repo-text">{`${STARGRAZERS_TITLE}: ${stargazersCount}`}</span>
        {!!onRemove &&
          <b className="repo-text repo-text-button" onClick={() => onRemove(id)}>
            {BUTTON_TEXT_REMOVE}
          </b>}
      </div>
    </div>
  );
}

const AddRepo = () => {
  const [ repoInput, setRepoInput ] = useState('');
  const [ repos, updateRepos ] = useState([]);

  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
    refetch,
  } = useQuery(GET_REPOSITORY,
    {
      variables: { name: repoInput },
      onCompleted: (data) => {
        if (data && data.repository) {
          const { repository } = data;
          // Push returned repository item to existing or new repo array
          const filteredRepo = repos.length
            ? repos.filter(repo => repo.id !== repository.id)
              : [];
          filteredRepo.push(repository);
          updateRepos(filteredRepo);
        }
      },
      onError: ({ message }) => { console.error(message) }
    });
  // Remove card by excluding it from repository list
  const onRemove = (activeRepoId) => {
    updateRepos(repos.filter(repo => repo.id !== activeRepoId));
  }

  let results = [];
  if (repos.length) {
    repos.forEach((data, i) => {
      let repoItem = getRepoItem(data, i, onRemove);
      results.unshift(repoItem);
    });
  }

  return (
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">{WELCOME_TEXT}</h2>
          <div>{REPO_URL}</div>
          <form onSubmit={e => {
              e.preventDefault();
              setRepoInput(e.target.value);
              refetch();
            }}>
            <input
              value={repoInput}
              placeholder="Search for repository"
              className="input"
              onChange={e => {
                e.preventDefault();
                setRepoInput(e.target.value);
                refetch();
              }}
            />
          </form>
        </header>
        {queryLoading && (<h5>{LOADING_STATE_TEXT}</h5>)}
        {queryData && !queryError && !queryLoading && (
          <div className="repo-board">
            {getRepoItem(queryData.repository)}
          </div>
        )}
        {!!results.length &&
          <div className="repo-results-board">
            <h5 className="repo-results-title">
              {LAST_SEARCH_TEXT}
            </h5>
              {results}
          </div>}
      </div>
  );
}

export default AddRepo;
