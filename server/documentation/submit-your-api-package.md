# How to submit your API package

After having described and verified your API packages and versions, the final step is to organize and submit your package to the [Community Mocks Repository](https://github.com/microcks/community-mocks). If you’re not sure about the previous steps, please check out more details on how to [describe API packages and versions](/doc/create-api-mocks) before proceeding.

To submit your package, you will have to create a GitHub pull request (PR) on the repository. You should now be in a situation where you have your manifests complete and valid, so it’s just a matter of putting them in the correct directory structure and creating the PR.

## Fork the repository

Start making your own copy of the community repository by forking it. If not sure how to do this, please read [GitHub documentation](https://docs.github.com/en/get-started/quickstart/fork-a-repo). As a result you should have a repository named `https://github.com/acme-org/community-mocks` considering you’re working at `acme-org`.

Clone this repository locally and create a new branch corresponding to your submission. If not sure how to do this, have a look at [GitHub flow documentation](https://docs.github.com/en/get-started/quickstart/github-flow#create-a-branch). Your local repository has been automatically switched to the new branch.

## Reproduce directory structure

It’s now time to put your manifest in the correct directory structure. All the contributions to the [Community Mocks Repository](https://github.com/microcks/community-mocks) are located in the `artifacts` sub-folder. This is where you’ll put your manifest files.

Within the `artifacts` folder, you will have to respect the following tree structure:

```
artifacts / <package_folder> / <api_folder> / <api_version_folder>
```

Let’s have a look at the `openbanking.org.uk` API package and it sub-structure including files:

```sh
$ tree openbanking.org.uk/
openbanking.org.uk
├── account-and-transaction
│   ├── 3.1.0
│   │   ├── account-and-transaction.3.1.0.api.yml
├── atm-locator
│   ├── 2.3.0
│   │   ├── atm-locator.2.3.0.api.yml
├── branch-locator
│   ├── 2.3.0
│   │   ├── branch-locator.2.3.0.api.yml
└── openbanking.org.uk.package.yml
```

The rules of this structure can be explained as follows:

- A `<package_folder>` must contain a file named `<package_name>.package.yml`: this your API Package manifest file. Here it’s `openbanking.org.uk.package.yml`,
- For each API item in the `apis` array of this manifest, we should have a sub-folder having the name of this API item. Here we have `account-and-transaction`, `atm-locator` and `branch-locator`,
- We should then find a sub-folder for each version of this API. Here we have the `3.1.0` sub-folder for `account-and-transaction` and the `2.3.0` folder for both `atm-locator` and `branch-locator`,
- Finally, for each API Version item, we should have a dedicated file named `<api_name>.<api_version>.api.yml`: these are your API Version manifest files. Here we have `account-and-transaction.3.1.0.api.yml`, `atm-locator.2.3.0.api.yml` and `branch-locator.2.3.0.api.yml`.

You have to reproduce this directory structure for your own package and API versions, put the API package and API versions manifest files at the correct locations with corresponding names.

## Create the PR

When your API package contribution is drafted, just commit and push your changes and then create a new Pull Request. If not sure how to do this, please read [GitHub documentation](https://docs.github.com/en/get-started/quickstart/github-flow#create-a-pull-request).

Your changes and Pull Requests should only deal with one package at a time. If applying changes on different packages, please consider creating as much PRs as the number of modified packages.

Once your PR is approved it will first go through an automated verification process and then an human review. Your manifest will be checked for syntax, completeness and functional links to your own repository. Any enhancements or modification requests will be discussed in the PR. Upon success we will merge it and your contribution is complete.

Congratulations! You’ve gone through the whole process of contributing an API package to the Hub.Microcks.io. Please tell us about your experience on the [Microcks Zulip Chat](https://microcksio.zulipchat.com) or through an issue of the [Community Mocks Repository](https://github.com/microcks/community-mocks/issues). We would be happy to discuss how to enhance it!
