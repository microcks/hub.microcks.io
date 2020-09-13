#!/bin/bash

pushd ./data/

if [ ! -d "community-mocks" ]; then
  
  if [ ! $1 ]; then
    echo "Using default community mocks repository"
    #MOCKS_REPO=https://github.com/microcks/community-mocks.git
    MOCKS_REPO=https://github.com/lbroudoux/community-mocks.git
  else
    MOCKS_REPO=$1
    echo "Using $MOCKS_REPO as community mocks repository"
  fi

  git clone $MOCKS_REPO community-mocks || exit 1
fi

if [ ! $2 ]; then
  echo "Using master branch"
  MOCKS_BRANCH=master
else
  MOCKS_BRANCH=$2
  echo "Using $MOCKS_BRANCH branch"
fi

pushd community-mocks
git fetch origin $MOCKS_BRANCH
git pull origin $MOCKS_BRANCH
popd

popd
exit 0