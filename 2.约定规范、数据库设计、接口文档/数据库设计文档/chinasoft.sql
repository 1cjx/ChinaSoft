/*
 Navicat Premium Data Transfer

 Source Server         : 中软项目组
 Source Server Type    : MySQL
 Source Server Version : 80300 (8.3.0)
 Source Host           : 120.46.211.213:3306
 Source Schema         : chinasoft

 Target Server Type    : MySQL
 Target Server Version : 80300 (8.3.0)
 File Encoding         : 65001

 Date: 17/04/2024 14:17:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for amusement_facility
-- ----------------------------
DROP TABLE IF EXISTS `amusement_facility`;
CREATE TABLE `amusement_facility`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '名称',
  `introduction` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '介绍',
  `longitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '经度',
  `latitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '纬度',
  `per_user_count` int NULL DEFAULT NULL COMMENT '一次游玩的人数\n',
  `expect_time` int NULL DEFAULT NULL COMMENT '预计游玩时间（以分钟为单位）',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '项目类型（过山车、轨道、失重、水上、室内、旋转、鬼屋）',
  `crowd_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '适合人群（成人、老少皆宜、家长监护）',
  `start_time` time NULL DEFAULT NULL COMMENT '开放时间',
  `close_time` time NULL DEFAULT NULL COMMENT '关闭时间',
  `status` int NULL DEFAULT NULL COMMENT '状态 0-正常 1-异常（如果是在检修的时候status为1，注意夜晚闭馆未开放的时候status为0）',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_deleted` int NULL DEFAULT 0 COMMENT '逻辑删除(0-未删除，1-已删除)',
  `instruction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '游玩须知',
  `height_low` int NULL DEFAULT NULL COMMENT '身高下限',
  `height_up` int NULL DEFAULT NULL COMMENT '身高上限',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for base_facility
-- ----------------------------
DROP TABLE IF EXISTS `base_facility`;
CREATE TABLE `base_facility`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '设施ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设施名称',
  `latitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '纬度',
  `longitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '经度',
  `start_time` time NULL DEFAULT NULL COMMENT '开放开始时间',
  `close_time` time NULL DEFAULT NULL COMMENT '开放结束时间',
  `status` int NOT NULL DEFAULT 0 COMMENT '状态（0-正常，1-异常）',
  `expect_time` int NULL DEFAULT NULL COMMENT '一个人的预期使用时间',
  `max_capacity` int NULL DEFAULT NULL COMMENT '最大容纳人数',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_deleted` int NOT NULL DEFAULT 0 COMMENT '逻辑删除标志（0-未删除，1-已删除）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '基础设施表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for crowding_level
-- ----------------------------
DROP TABLE IF EXISTS `crowding_level`;
CREATE TABLE `crowding_level`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `facility_id` bigint NOT NULL COMMENT '设施ID',
  `facility_type` int NOT NULL COMMENT '设施类别',
  `expect_wait_time` int NOT NULL COMMENT '预计等待时长（分钟）',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_deleted` int NOT NULL DEFAULT 0 COMMENT '逻辑删除（0-未删除，1-已删除）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9118 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '拥挤度表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for employee
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '密码',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '姓名',
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户头像',
  `gender` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '性别',
  `age` int NULL DEFAULT NULL COMMENT '年龄',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机号',
  `role` int NULL DEFAULT NULL COMMENT '角色（0-普通员工，1-管理员）',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` int NULL DEFAULT 0 COMMENT '逻辑删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for facility_headcount
-- ----------------------------
DROP TABLE IF EXISTS `facility_headcount`;
CREATE TABLE `facility_headcount`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `facility_id` bigint NOT NULL COMMENT '设施ID',
  `count` int NOT NULL COMMENT '游玩人数',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_deleted` tinyint NULL DEFAULT 0 COMMENT '是否删除（0-未删除 1-已删除）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 123 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '各个游玩设施人数统计表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for facility_image
-- ----------------------------
DROP TABLE IF EXISTS `facility_image`;
CREATE TABLE `facility_image`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `facility_id` bigint NULL DEFAULT NULL COMMENT '设施id',
  `facility_type` int NULL DEFAULT NULL COMMENT '设施类型（0-游乐设施，1-餐饮设施，2-基础设施）',
  `image_url` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '图片url',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_deleted` int NOT NULL DEFAULT 0 COMMENT '逻辑删除标志（0-未删除，1-已删除）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 194 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for recomm_route
-- ----------------------------
DROP TABLE IF EXISTS `recomm_route`;
CREATE TABLE `recomm_route`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `route_id` bigint NULL DEFAULT NULL COMMENT '路线id',
  `facility_id` bigint NULL DEFAULT NULL COMMENT '设施id',
  `priority` int NOT NULL COMMENT '路线顺序（按1-2-3-4从小到大的顺序）',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_deleted` int NOT NULL DEFAULT 0 COMMENT '逻辑删除 （0-未删除 1-已删除）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 204 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '推荐路线表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for restaurant_facility
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_facility`;
CREATE TABLE `restaurant_facility`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '设施ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设施名称',
  `introduction` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '设施介绍',
  `latitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '纬度',
  `longitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '经度',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设施类型（中式快餐、西式快餐、面点、饮品、小吃）',
  `start_time` time NULL DEFAULT NULL COMMENT '开放开始时间',
  `close_time` time NULL DEFAULT NULL COMMENT '开放结束时间',
  `status` int NOT NULL DEFAULT 0 COMMENT '状态（0-正常，1-异常）',
  `expect_time` int NULL DEFAULT 0 COMMENT '每个人的预计用餐时间\r\n',
  `max_capacity` int NULL DEFAULT NULL COMMENT '最大容纳人数',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_deleted` int NOT NULL DEFAULT 0 COMMENT '逻辑删除标志（0-未删除，1-已删除）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '餐饮设施表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for route
-- ----------------------------
DROP TABLE IF EXISTS `route`;
CREATE TABLE `route`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '路线名称',
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '路线图片URL',
  `use_count` int NULL DEFAULT 0 COMMENT '路线使用次数统计',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_deleted` int NOT NULL DEFAULT 0 COMMENT '逻辑删除标志（0-未删除 1-已删除）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '路线表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for subscribe
-- ----------------------------
DROP TABLE IF EXISTS `subscribe`;
CREATE TABLE `subscribe`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `facility_id` bigint NOT NULL COMMENT '设施ID',
  `facility_type` int NOT NULL COMMENT '设施类别（0-游乐设施，1-餐厅设施，2-基础设施）',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_deleted` int NOT NULL DEFAULT 0 COMMENT '逻辑删除（0-未删除 1-已删除）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 279 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户订阅记录表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for total_headcount
-- ----------------------------
DROP TABLE IF EXISTS `total_headcount`;
CREATE TABLE `total_headcount`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `count` int NULL DEFAULT NULL COMMENT '游玩人数',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_deleted` tinyint NULL DEFAULT 0 COMMENT '是否删除（0-未删除 1-已删除）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '总人数统计表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '密码',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机号',
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户头像',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` int NULL DEFAULT 0 COMMENT '逻辑删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for visit
-- ----------------------------
DROP TABLE IF EXISTS `visit`;
CREATE TABLE `visit`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `facility_id` bigint NOT NULL COMMENT '设施ID',
  `facility_type` int NOT NULL COMMENT '设施类别（0-游乐设施，1-餐厅设施，2-基础设施）',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_deleted` int NOT NULL DEFAULT 0 COMMENT '逻辑删除（0-未删除 1-已删除）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 168 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户打卡记录表' ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
