#!/bin/bash

# TODO: in progress, now almost useless, because login to root needs sudo which is problem from script + env variables wont load
# NOTE: uploading this file is not good practice, but I want for people to see it so they can test app

# PREREQUIRES FOR RUNNING THIS SCRIPT
# 1: sudo mariadb or mariadb
# 2: GRANT ALL PRIVILEGES ON *.* TO 'filipozbolt'@'localhost' IDENTIFIED BY '123' WITH GRANT OPTION;
# 3: FLUSH PRIVILEGES;
# 4: chmod +x createDatabase.sh
# 5: ./createDatabase.sh

#hardcoded script
mysql -u filipozbolt -p123 -e "CREATE DATABASE IF NOT EXISTS chat_app;"
echo "Database 'chat_app' created successfully."


# dummy script

#if [ -f .env ]; then
#    source .env
#fi
#
#mysql -u "$DB_USERNAME" -p"$DB_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"
#
#echo "Database '$DB_NAME' created successfully."


### final script:

## MariaDB root user credentials
#ROOT_USER="$DB_ROOT_USER"
#ROOT_PASSWORD="$DB_ROOT_PASSWORD"  # Assuming you have a variable for root password in your .env file
#
## Create database and user
#mysql -u $ROOT_USER -p$ROOT_PASSWORD -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"
#mysql -u $ROOT_USER -p$ROOT_PASSWORD -e "CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';"
#mysql -u $ROOT_USER -p$ROOT_PASSWORD -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';"
#mysql -u $ROOT_USER -p$ROOT_PASSWORD -e "FLUSH PRIVILEGES;"
#
#echo "Database '$DB_NAME' and user '$DB_USER' created successfully."

