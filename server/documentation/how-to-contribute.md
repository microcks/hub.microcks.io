# How to contribute an API package

Hub.Microcks.io is the front-end for the [Community Mocks Repository](https://github.com/microcks/community-mocks). This is an open source community project that collects and curates API Mocks & Test suites for being used within any [Microcks](https://microcks.io) instance. If you are actually discovering what Microcks is then we urge you to have a look at [Microcks.io](https://microcks.io).

Hub.Microcks.io allows developers, standardisation organisations, regulatory committees and product managers to easily distribute their API specifications, mocks and test suites. Microcks users can directly access Hub.Microcks.io to retrieve these API artifacts and make them actionable through a number of use-cases:

* Discover and play with API,
* Create a local sandbox for their developers,
* Evaluate the impacts of an API version upgrade,
* Assess their implementation using an API Test and Certification Kit,
* Animate and grow an API consumers community, ...

Microcks leverages standard specifications and formats you probably already use to describe your API. So adding them to the Hub is just a matter of packaging and metadata addition so that users can easily discover them. To contribute your API package, metadata should be described using some `manifests` that you pushed then to the [Community Mocks Repository](https://github.com/microcks/community-mocks).

Have a look at some contributions in [https://github.com/microcks/community-mocks/tree/master/artifacts](https://github.com/microcks/community-mocks/tree/master/artifacts) and read the next sections to get all the information you need to share your package as well!


## Build your API package

Basically, your API package is made of one or multiple API artifacts that live in their own repository. We encourage using a Git repository but the only requirement is to be a publicly available HTTP repository. By API artifacts, we mean any contract standard that is supported by Microcks - and [the list is now extensive](https://microcks.io/documentation/references/artifacts/) ; you probably already got them at hand!

Check out more details on how to [create API mocks using supported formats](/doc/create-api-mocks).

Once your artifacts are available, you need to give additional information to ensure they can be correctly registered within Hub.Microcks.io. You register your API using 2 concepts:

* The `API Package` is the top-level concept that allows you to wrap together a set of related APIs. The package can be related to an open source project, a commercial product or an industrial standard and it must belongs to a specific business category,
* The `API Versions` are simply the versioned APIs that are members of the package. The Hub will keep history of different versions you’ll release through your package. An API Version links to your API artifacts through the `contracts` property as illustrated in below schema.

![Git repos organization](/assets/images/git-repos-organization.png "Git repos organization")

Check out more details on how to [describe API packages and versions](/doc/package-api-mocks).


## Submit your API package

When your API package and versions descriptions are complete and valid, create a pull request with your API package data only in the `artifacts` subdirectory. Your manifest will be checked for syntax, completeness and functional links to your own repository. Any enhancements will be discussed in the PR. Upon success we will merge it and your contribution is complete.

Check out more details on how to [submit your API package contribution](/doc/submit-your-api-package).

> Note: Submitting does not mean that you are transferring maintenance responsibility !!


## When will my API package show up?

After running automated validation, tests and reviews, your API Package will be visible on the index of [Hub.Microcks.io](https://hub.microcks.io). Depending on the necessary human review, this process should not take more than a couple of days. Microcks users will then be able to discover and play with your API.
