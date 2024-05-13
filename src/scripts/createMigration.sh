#!/bin/bash

migration_name=$1
migration_dir="src/database/mariadb/migrations/$migration_name"

npx typeorm migration:create $migration_dir

# run: ➜ npm run migration:create MigrationName