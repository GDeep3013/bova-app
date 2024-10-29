-- AlterTable
ALTER TABLE `session` MODIFY `expires` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `Order` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `order_id` BIGINT NOT NULL,
    `order_name` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NULL,
    `customer_id` BIGINT NOT NULL,
    `customer_name` VARCHAR(191) NOT NULL,
    `customer_email` VARCHAR(191) NOT NULL,
    `item_count` VARCHAR(191) NOT NULL,
    `total` VARCHAR(191) NOT NULL,
    `payment_status` VARCHAR(191) NOT NULL,
    `delivery_status` VARCHAR(191) NOT NULL,
    `delivery_method` VARCHAR(191) NOT NULL,
    `fullfilement` VARCHAR(191) NOT NULL,
    `order_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
