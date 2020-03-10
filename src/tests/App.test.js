import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import renderer from 'react-test-renderer';
import { act } from "react-dom/test-utils";
import { GET_REPOSITORY } from '../queries';
import AddRepo from '../App';

const wait = require('waait');

const mocks = [
  {
    request: {
      query: GET_REPOSITORY,
      variables: {
        name: 'gatsby-i18n-source'
      },
    },
    result: {
      data: {
        repository: {
          id: 'MDEwOlJlcG9zaXRvcnkyMTc5MDM0MTA=',
          name: 'gatsby-i18n-source',
          owner: {
            id: 'MDEyOk9yZ2FuaXphdGlvbjEyNTUxODYz',
            avatarUrl: 'https://avatars1.githubusercontent.com/u/12551863?v=4',
            __typename: 'Organization'
          },
          forkCount: 3,
          watchers: {
            totalCount: 18,
            __typename: 'UserConnection'
          },
          stargazers: {
            totalCount: 3,
            __typename: 'StargazerConnection'
          },
          __typename: 'Repository'
        }
      }
    }
  }
];

it('should return valid reposetory data by handling input onChange event', async () => {
  let component;
  await act(async () => {
    component = renderer.create(
      <MockedProvider mocks={mocks}>
        <AddRepo name="gatsby-i18n-source" />
      </MockedProvider>,
    );
  });
  const event = { preventDefault: () => {}, target: { value: 'gatsby-i18n-source'} }
  const instance = component.root;
  const input = instance.findByType('input');
  input.props.onChange(event);
  await wait(10);
  expect(instance.findByProps({className: 'repo-results-board'}).children.length > 1).toBe(true);
});

it('should return repository items by handling form onSubmit event', async () => {
  let component;
  await act(async () => {
    component = renderer.create(
      <MockedProvider mocks={mocks}>
        <AddRepo name="gatsby-i18n-source" />
      </MockedProvider>,
    );
  });
  const event = { preventDefault: () => {}, target: { value: 'gatsby-i18n-source'} }
  const instance = component.root;
  const input = instance.findByType('form');
  input.props.onSubmit(event);
  await wait(10);
  expect(instance.findByProps({className: 'repo-results-board'}).children.length > 1).toBe(true);
});

it('should prevent a browser reload/refresh by handling events with preventDefault() method', async () => {
  let component;
  await act(async () => {
    component = renderer.create(
      <MockedProvider mocks={mocks}>
        <AddRepo name="gatsby-i18n-source" />
      </MockedProvider>,
    );
  });
  const event = { preventDefault: () => {}, target: { value: 'gatsby-i18n-source'} }
  jest.spyOn(event, 'preventDefault');
  const instance = component.root;
  const input = instance.findByType('form');
  input.props.onSubmit(event);
  expect(event.preventDefault).toBeCalled();
});
