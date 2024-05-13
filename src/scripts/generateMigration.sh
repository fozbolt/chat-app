#!/bin/bash

migration_name=$1
migration_dir="src/database/mariadb/migrations/$migration_name"
config_path="dist/config/typeorm/typeorm.config.js"

npx typeorm migration:generate $migration_dir -d $config_path

# run: ➜ npm run migration:generate MigrationName