# Actions PullRequest Deployment Parser

[![release](https://github.com/elioetibr/actions-cicd-manifest/actions/workflows/release.yaml/badge.svg?branch=index)](https://github.com/elioetibr/actions-cicd-manifest/actions/workflows/release.yaml)
[![ts](https://github.com/elioetibr/actions-cicd-manifest/actions/workflows/tests.yaml/badge.svg)](https://github.com/elioetibr/actions-cicd-manifest/actions/workflows/tests.yaml)

## Get Started

This Action can be used to generate deployment information.

## Development information

* NVM
* Node v20
* TypeScript
* Jest

## GitHub Actions Usage

### Inputs

| Name             | Description                       | Required | Default |
|:-----------------|:----------------------------------|:---------|:--------|
| app_version      | Application Version (e.g. v0.1.0) | false    |         |
| chart_repository | GitHub Helm Chart Repository      | false    |         |
| chart_version    | Helm Chart Version (e.g. v0.1.0)  | false    |         |
| environment      | Deployment Environment            | false    | dev     |
| owner            | GitHub Organization Owner         | false    |         |
| repo             | GitHub Helm Chart Repository      | false    |         |
| token            | GitHub Token                      | false    |         |

### Outputs

| Name                      | Description                                         |
|:--------------------------|:----------------------------------------------------|
| aws_account_id            | AWS Deployment Account Id                           |
| aws_region                | AWS Deployment Region                               |
| cluster                   | AWS EKS Cluster Name                                |
| deployment_environment    | Deployment Environment Data                         |
| deployment_variable       | Deployment Variable Data                            |
| enabled                   | If Deployment is enabled or not                     |
| environment               | Current Environment to be Deployed                  |
| next_environment          | Next Environment to be Deployed                     |
| pull_request_message_body | GitHub Deployment PullRequest Message Body          |
| service                   | Deployment Service Name                             |
| with_gate                 | Determine if deployment will be with gate approvals |
