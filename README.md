# 3-Tier Application Infrastructure Boilerplate

A secure, production-ready infrastructure boilerplate for containerizing a 3-tier application local environment before migrating to cloud services like AWS. This setup bundles a React frontend, a Node.js backend API, and a PostgreSQL database into an isolated local cloud stack orchestrated via Docker Compose.

## 🏗️ Architecture Overview

The configuration splits the platform into three interconnected tiers communicating over an isolated virtual network bridge:

1. **Frontend Tier:** Powered by a lightweight, secure Nginx Alpine engine configured to serve production static assets.
2. **Backend Tier:** Running an Express Node.js application server hardened to execute commands safely as a restricted, non-root user (`node`).
3. **Database Tier:** A stateful PostgreSQL database cluster equipped with localized health checks and automated disk persistence volumes.

---

## 📂 Project Directory Structure

Ensure your workspace follows this localized design pattern to satisfy Docker build context lookups:

```text
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── build/
│   │   └── index.html
│   └── Dockerfile
├── .gitignore
├── docker-compose.yml
└── README.md
