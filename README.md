# cloud-native-webapp-k8s

Cloud native production environment for a web application on Kubernetes – with scaling, security, GitOps deployment, CI/CD and monitoring.

> Sections are filled in step by step according to the [issues](../../issues).

## Contents

- [Architecture](#architecture)
- [Repository structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage and verification](#usage-and-verification)
- [Design decisions and trade-offs](#design-decisions-and-trade-offs)
- [Repository workflow](#repository-workflow)

## Architecture

_TODO (#8) – diagram and component overview._

| Area        | Technology                                       |
|-------------|--------------------------------------------------|
| Cluster     | minikube (Calico CNI)                            |
| Application | Node.js (Express) backend, nginx frontend        |
| Packaging   | Helm                                             |
| Security    | RBAC, NetworkPolicy, Pod Security Admission      |
| GitOps      | ArgoCD                                           |
| CI/CD       | GitHub Actions, GHCR                             |
| Monitoring  | kube-prometheus-stack (Prometheus, Alertmanager) |

## Repository structure

Planned structure (directories are added with the individual issues):

```
.
├── app/
│   ├── backend/        # Node.js API + /metrics
│   └── frontend/       # static frontend served by nginx
├── helm/               # Helm chart(s) for the application
├── gitops/             # ArgoCD Application manifests
├── monitoring/         # ServiceMonitor, PrometheusRule, stack values
├── .github/workflows/  # CI/CD pipeline
└── README.md
```

## Prerequisites

_TODO – tool versions (minikube, kubectl, helm, docker)._

## Installation

_TODO._

## Usage and verification

_TODO._

## Design decisions and trade-offs

_TODO._

## Repository workflow

- Every task has a **GitHub issue**; work happens on a dedicated branch `<type>/<issue>-<description>`, e.g. `feat/3-helm-chart`.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): description (#issue)`, e.g. `feat(helm): add backend deployment (#3)`.
  - types: `feat`, `fix`, `docs`, `ci`, `chore`, `refactor`, `test`
- Changes reach `main` only through a **Pull Request** (squash merge); the PR closes its issue via `Closes #N`.
