#!/usr/bin/env bash

# Initialize npm package
npm run integration:pack

# Create Vite.js application
echo "inkline-vite" | npm create vue@latest -- --ts --router --pinia --force
cd inkline-vite || exit 1

# Initialize Inkline via CLI
npx inkline@latest init

# Install dependencies
npm install -S ../lib/inkline-*.tgz
npm install

# Clean up installation
rm -rf src/assets
rm -rf src/components

# Copy project files
cp -r ../e2e/integration/common/project/* src
cp -r ../e2e/integration/vite/project/* src
