# cloud-native-webapp-k8s

Cloud native production environment for a web application on Kubernetes – with scaling, security, GitOps deployment, CI/CD and monitoring.

## Contents

- [Architecture](#architecture)
- [Repository structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage and verification](#usage-and-verification)
- [Design decisions and trade-offs](#design-decisions-and-trade-offs)
- [What I would add for production](#what-i-would-add-for-production)
- [Repository workflow](#repository-workflow)

## Architecture

Diagram of the request flow and the delivery flow, and a table mapping each requirement of the assignment to the files that implement it.

## Repository structure

Directory tree of the repository with one line describing each directory.

## Prerequisites

Tools and versions needed to run the project and the CPU and memory the cluster needs.

## Installation

### 1. Cluster

Commands to start minikube with Calico and enable the ingress and metrics-server addons.

### 2. Argo CD

Commands to install Argo CD and apply `gitops/root.yaml`, after which everything else is synced from Git.

### 3. Admin token on a new cluster

How to provide the admin token when the committed SealedSecret cannot be decrypted on a new cluster.

### 4. Access

How to reach the application, Argo CD, Prometheus and Alertmanager through port-forwards.

## Usage and verification

### Application

How to call the API and what the response shows.

### GitOps

How a change merged to `main` gets deployed and how manual changes in the cluster are reverted.

### CI/CD

What runs on a pull request, what runs after a merge to `main` and which repository settings are required.

### Security checks

Commands that show the network policies, Pod Security Admission and RBAC in action.

### Alerts

The list of alerts and how to trigger the 5xx alert with the admin endpoint.

## Design decisions and trade-offs

The main decisions, why they were made and what they cost.

## What I would add for production

What is missing for a real production environment and how I would add it.

## Repository workflow

How issues, branches, commits and pull requests are used in this repository.
