# hub.microcks.io

Public Hub for community Microcks mocks and tests.

[![License](https://img.shields.io/github/license/microcks/hub.microcks.io?style=for-the-badge&logo=apache)](https://www.apache.org/licenses/LICENSE-2.0)
[![Project Chat](https://img.shields.io/badge/discord-microcks-pink.svg?color=7289da&style=for-the-badge&logo=discord)](https://microcks.io/discord-invite/)
[![Artifact HUB](https://img.shields.io/endpoint?url=https://artifacthub.io/badge/repository/microcks-hub-image&style=for-the-badge)](https://artifacthub.io/packages/search?repo=microcks-hub-image)
[![CNCF Landscape](https://img.shields.io/badge/CNCF%20Landscape-5699C6?style=for-the-badge&logo=cncf)](https://landscape.cncf.io/?item=app-definition-and-development--application-definition-image-build--microcks)

## Build Status

Latest released version is `0.1.0`.

Current development version is `0.2.0`.

#### Fossa license and security scans

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmicrocks%2Fhub.microcks.io.svg?type=shield&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmicrocks%2Fhub.microcks.io?ref=badge_shield&issueType=license)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmicrocks%2Fhub.microcks.io.svg?type=shield&issueType=security)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmicrocks%2Fhub.microcks.io?ref=badge_shield&issueType=security)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmicrocks%2Fhub.microcks.io.svg?type=small)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmicrocks%2Fhub.microcks.io?ref=badge_small)

#### OpenSSF best practices on Microcks core

[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/7513/badge)](https://bestpractices.coreinfrastructure.org/projects/7513)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/microcks/microcks/badge)](https://securityscorecards.dev/viewer/?uri=github.com/microcks/microcks)

## Community

* [Documentation](https://microcks.io/documentation/tutorials/getting-started/)
* [Microcks Community](https://github.com/microcks/community) and community meeting
* Join us on [Discord](https://microcks.io/discord-invite/), on [GitHub Discussions](https://github.com/orgs/microcks/discussions) or [CNCF Slack #microcks channel](https://cloud-native.slack.com/archives/C05BYHW1TNJ)

To get involved with our community, please make sure you are familiar with the project's [Code of Conduct](./CODE_OF_CONDUCT.md).

## SBOM (Software Bill Of Materials)

We produce a SBOM for our container images that are attached as a metadata layer.

To retrieve this SBOM layer digest, issue this command replacing the `nightly` tag with the one or the digest of your choice:

```sh
$ docker manifest inspect --verbose quay.io/microcks/microcks-hub:nightly | jq '.[2].OCIManifest.layers | map(select(.annotations."in-toto.io/predicate-type" == "https://spdx.dev/Document") | .digest)[0]'
```

Then use a tool such as [ORAS](https://oras.land/) to fetch the blob content of this layer:

```sh
$ oras blob fetch --output - quay.io/microcks/microcks-postman-runtime:nightly@$SBOM_DIGEST | jq .
=== OUTPUT ===
{
  "_type": "https://in-toto.io/Statement/v0.1",
  "predicateType": "https://spdx.dev/Document",
  "subject": [
    {
      "name": "pkg:docker/quay.io/microcks/microcks-postman-runtime@nightly?platform=linux%2Famd64",
      "digest": {
        "sha256": "11c951599ed1bf649abbc2b23ae2730a4e1ef6ad9537a7f10df39b6546bf8429"
      }
    }
  ],
  "predicate": {
    "spdxVersion": "SPDX-2.3",
    "dataLicense": "CC0-1.0",
    "SPDXID": "SPDXRef-DOCUMENT",
    "name": "sbom",
    "documentNamespace": "https://anchore.com/syft/dir/sbom-250326c0-1ac9-45df-b956-7034af7e03f0",
    "creationInfo": {
      "licenseListVersion": "3.23",
      "creators": [
        "Organization: Anchore, Inc",
        "Tool: syft-v0.105.0",
        "Tool: buildkit-v0.17.2"
      ],
      "created": "2024-12-03T13:19:29Z"
    },
    "packages": [
      //[...]
    ]
  }
}
```