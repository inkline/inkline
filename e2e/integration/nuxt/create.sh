#!/usr/bin/env bash

# Initialize npm package
npm run integration:pack

# Create Vite.js application
npx nuxi init inkline-nuxt
cd inkline-nuxt || exit 1

# Initialize Inkline via CLI
npx inkline@latest init

# Install dependencies
npm install -S ../lib/inkline-*.tgz
npm install
