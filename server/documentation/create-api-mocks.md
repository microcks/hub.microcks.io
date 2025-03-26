# How to create API mocks and tests suite

If you are actually discovering what Microcks is then we urge you to have a look at [Microcks.io](https://microcks.io). You’ll discover that Microcks is covering two main use-cases:

> 1. It turns out your API contracts into **live mocks in seconds**,

> 2. It then uses your API specifications for **continuously testing the conformance** of your development.

How is Microcks doing that? You may have guessed that the starting point here are the contracts and specifications of your API; also called API artifacts. You probably already use some industrial or de-facto standards to express them within your API development process. At time of writing, Microcks is supporting the standards illustrated below and we recommend having a look at [the reference documentation](https://microcks.io/documentation/references/artifacts/).


![Supported artifacts formats](https://microcks.io/images/documentation/artifacts-formats.png "Microcks artifacts formats")


So having these artifacts at hand is enough? Almost. 

In order to be useful, these artifacts should also contain examples. Examples are a very important part of the documentation: what’s better than real-life examples to understand how things are expected to work? Microcks applies example-driven design and executable specification concepts. The examples from these artifacts will be used to produce both the mocks and the tests suite.

Check out more details on example-driven on [Why Microcks?](https://microcks.io/blog/why-microcks/#1-business-requirements-without-translation).


## Define examples

Once you have selected your API artifacts that will represent your contribution basis, ensure they are embedding useful examples for your API operations. You do not need to cover all the cases from the start! It can be an iterative process: start with most common cases examples and then add edge and exception cases later.

Microcks provides documentation on the different supported formats. Here are the main documentation pointers for [OpenAPI](https://microcks.io/documentation/references/artifacts/openapi-conventions/), [AsyncAPI](https://microcks.io/documentation/references/artifacts/asyncapi-conventions/), [Postman collections](https://microcks.io/documentation/references/artifacts/postman-conventions/), [SoapUI projects](https://microcks.io/documentation/references/artifacts/soapui-conventions/) or [gRPC](https://microcks.io/documentation/references/artifacts/grpc-conventions/).

At that time, you may want to validate these examples on a local Microcks instance. You can easily install Microcks using Docker-Compose on a laptop. Please check out more details on the [Docker-Compose installation](https://microcks.io/documentation/guides/installation/docker-compose/).


## Add more artifacts

Although one artifact is enough for providing examples and a test suite, it may be interesting sometimes to supply different kinds of complementary artifacts for advanced purposes. A typical case is to provide:

* an OpenAPI specification for defining the syntactical contract of your API and examples,
* an additional Postman collection for holding business related test assertions on your API - things that are typically impossible to represent using OpenAPI.

It is definitely possible to reference multiple API artifacts in your contributed API package. Check out more detail on [Multi-artifacts support](https://microcks.io/documentation/using/importers/#multi-artifacts-support) documentation.


## Share them!

Last step is to publish your API artifacts on a publicly accessible repository owned by your organization. The [Hub](https://hub.microcks.io) just requires HTTP access but we encourage you to consider using a Git repository and pointing to a well-identified revision of the API artifact files. You can do this using a Git tag or commit ID url: it will provide a stable url and easy management and troubleshooting for future users.
