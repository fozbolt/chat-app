import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabaseMigration1622107764557 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create country table
        await queryRunner.query(`
            CREATE TABLE country
            (
                country_id   INT          NOT NULL AUTO_INCREMENT,
                name         VARCHAR(100) NOT NULL UNIQUE,
                country_code VARCHAR(2)   NOT NULL UNIQUE,
                locale       VARCHAR(30)  NULL,
                created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (country_id)
            );
        `);

        // Create message_file table
        await queryRunner.query(`
            CREATE TABLE message_file
            (
                message_file_id VARCHAR(36)  NOT NULL,
                url             VARCHAR(200) NULL,
                message_id      INT          NOT NULL,
                created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                is_deleted      TINYINT      NOT NULL DEFAULT 0,
                PRIMARY KEY (message_file_id)
            );
        `);

        // Create message table
        await queryRunner.query(`
            CREATE TABLE message
            (
                message_id   INT       NOT NULL AUTO_INCREMENT,
                created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                room_id      INT       NOT NULL,
                user_id      INT       NOT NULL,
                message_text TEXT      NOT NULL,
                removed_at   TIMESTAMP NULL,
                edited_at    TIMESTAMP NULL,
                is_deleted   TINYINT   NOT NULL DEFAULT 0,
                PRIMARY KEY (message_id)
            );
        `);

        // Create message_read_receipts table
        await queryRunner.query(`
            CREATE TABLE message_read_receipts
            (
                read_receipt_id INT       NOT NULL AUTO_INCREMENT,
                message_id      INT       NOT NULL,
                user_id         INT       NOT NULL,
                read_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (read_receipt_id)
            );
        `);

        // Create permission table
        await queryRunner.query(`
            CREATE TABLE permission
            (
                permission_id INT         NOT NULL,
                name          VARCHAR(50) NOT NULL UNIQUE,
                created_at    TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at    TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                description   TEXT        NULL,
                PRIMARY KEY (permission_id)
            );
        `);

        // Create preference table
        await queryRunner.query(`
            CREATE TABLE preference
            (
                preference_id INT         NOT NULL AUTO_INCREMENT,
                name          VARCHAR(40) NOT NULL UNIQUE,
                created_at    TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at    TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (preference_id)
            );
        `);

        // Create permission_level table
        await queryRunner.query(`
            CREATE TABLE permission_level
            (
                permission_level_id INT          NOT NULL AUTO_INCREMENT,
                name                VARCHAR(50)  NOT NULL UNIQUE,
                description         VARCHAR(255) NULL,
                PRIMARY KEY (permission_level_id)
            );
        `);

        // Create role_permission table
        await queryRunner.query(`
            CREATE TABLE role_permission
            (
                role_id             INT       NOT NULL,
                permission_level_id INT       NULL,
                has_access          BOOL      NULL,
                permission_id       INT       NOT NULL,
                created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (role_id, permission_id)
            );
        `);

        // Create role table
        await queryRunner.query(`
            CREATE TABLE role
            (
                role_id    INT         NOT NULL AUTO_INCREMENT,
                name       VARCHAR(30) NOT NULL UNIQUE,
                created_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (role_id)
            );
        `);

        // Create room_user table
        await queryRunner.query(`
            CREATE TABLE room_user
            (
                room_user_id    INT                                               NOT NULL AUTO_INCREMENT,
                user_id         INT                                               NOT NULL,
                room_id         INT                                               NOT NULL,
                approval_status ENUM ('pending', 'forbidden', 'approved', 'left') NOT NULL DEFAULT 'pending',
                updated_at      TIMESTAMP                                         NULL,
                updated_by      INT                                               NULL,
                left_at         TIMESTAMP                                         NULL,
                created_at      TIMESTAMP                                         NOT NULL DEFAULT CURRENT_TIMESTAMP,
                hash            VARCHAR(64)                                       NOT NULL UNIQUE,
                PRIMARY KEY (room_user_id)
            );
        `);

        // Create room table
        await queryRunner.query(`
            CREATE TABLE room
            (
                room_id    INT         NOT NULL AUTO_INCREMENT,
                name       VARCHAR(40) NOT NULL,
                created_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
                is_private BOOL        NOT NULL,
                is_deleted TINYINT     NOT NULL DEFAULT 0,
                user_id    INT         NOT NULL,
                PRIMARY KEY (room_id)
            );
        `);

        // Create user_preference table
        await queryRunner.query(`
            CREATE TABLE user_preference
            (
                user_preference_id INT       NOT NULL AUTO_INCREMENT,
                user_id            INT       NOT NULL,
                preference_id      INT       NOT NULL,
                created_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (user_preference_id)
            );
        `);

        // Create user table
        await queryRunner.query(`
            CREATE TABLE user
            (
                user_id        INT          NOT NULL AUTO_INCREMENT,
                first_name     VARCHAR(100) NOT NULL,
                last_name      VARCHAR(100) NOT NULL,
                username       VARCHAR(30)  NOT NULL UNIQUE,
                is_deleted     TINYINT      NOT NULL DEFAULT 0,
                created_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
                last_active_at TIMESTAMP    NOT NULL,
                role_id        INT          NOT NULL,
                email          VARCHAR(200) NOT NULL UNIQUE,
                password       VARCHAR(255) NOT NULL,
                phone_number   VARCHAR(40)  NOT NULL UNIQUE,
                country_id     INT          NOT NULL,
                PRIMARY KEY (user_id)
            );
        `);

        // Add foreign keys
        await queryRunner.query(`
            ALTER TABLE message_file
                ADD CONSTRAINT fk_message_files_message FOREIGN KEY (message_id) REFERENCES message (message_id);
        `);

        await queryRunner.query(`
            ALTER TABLE message
                ADD CONSTRAINT fk_messages_room FOREIGN KEY (room_id) REFERENCES room (room_id),
                ADD CONSTRAINT fk_messages_user FOREIGN KEY (user_id) REFERENCES user (user_id);
        `);

        await queryRunner.query(`
            ALTER TABLE message_read_receipts
                ADD CONSTRAINT fk_read_receipts_message FOREIGN KEY (message_id) REFERENCES message (message_id),
                ADD CONSTRAINT fk_read_receipts_user FOREIGN KEY (user_id) REFERENCES user (user_id);
        `);

        await queryRunner.query(`
            ALTER TABLE room_user
                ADD CONSTRAINT fk_room_users_user FOREIGN KEY (user_id) REFERENCES user (user_id),
                ADD CONSTRAINT fk_room_users_room FOREIGN KEY (room_id) REFERENCES room (room_id);
        `);

        await queryRunner.query(`
            ALTER TABLE room
                ADD CONSTRAINT fk_room_created_by FOREIGN KEY (user_id) REFERENCES user (user_id);
        `);

        await queryRunner.query(`
            ALTER TABLE user_preference
                ADD CONSTRAINT fk_user_preferences_user FOREIGN KEY (user_id) REFERENCES user (user_id),
                ADD CONSTRAINT fk_user_preferences_preference FOREIGN KEY (preference_id) REFERENCES preference (preference_id);
        `);

        await queryRunner.query(`
            ALTER TABLE user
                ADD CONSTRAINT fk_users_country FOREIGN KEY (country_id) REFERENCES country (country_id),
                ADD CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES role (role_id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop tables with no dependencies first
        await queryRunner.query('DROP TABLE IF EXISTS user_preference;');
        await queryRunner.query('DROP TABLE IF EXISTS preference;');
        await queryRunner.query('DROP TABLE IF EXISTS permission_level;');
        await queryRunner.query('DROP TABLE IF EXISTS role_permission;');
        await queryRunner.query('DROP TABLE IF EXISTS permission;');

        // Then drop tables with dependencies
        await queryRunner.query('DROP TABLE IF EXISTS message_file;');
        await queryRunner.query('DROP TABLE IF EXISTS message_read_receipts;');
        await queryRunner.query('DROP TABLE IF EXISTS message;');
        await queryRunner.query('DROP TABLE IF EXISTS room_user;');
        await queryRunner.query('DROP TABLE IF EXISTS room;');
        await queryRunner.query('DROP TABLE IF EXISTS user;');
        await queryRunner.query('DROP TABLE IF EXISTS role;');
        await queryRunner.query('DROP TABLE IF EXISTS country;');
    }
}
