#!/bin/bash

migration_name=$1
config_path="./src/config//typeorm/typeorm.config.ts"

npx typeorm migration:generate $migration_name -d $config_path

# run: ➜ npm run migration:generate  migrationName