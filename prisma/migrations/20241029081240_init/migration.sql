-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `patient` DROP FOREIGN KEY `Patient_doctorId_fkey`;
