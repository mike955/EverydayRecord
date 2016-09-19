CREATE SCHEMA `everyday_record`;

-- Create syntax for TABLE 'core_account'
CREATE TABLE 'everyday_record'.'core_account'(
	`id` INT(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '账户ID',
	`username` varchar(32) unsigned NOT NULL COMMENT '用户名',
	`phone` varchar(11) COMMENT '电话',
	`password` varchar(32) NOT NULL COMMENT '密码',
	`salt` varchar(5) NOT NULL COMMENT '盐',
	`gender` tinyint(4) unsigned DEFAULT NULL COMMENT '性别(1:男2:女)',
	`email` varchar(32) unsigned DEFAULT NULL COMMENT '邮箱',
	`type` tinyint(4) NOT NULL COMMENT '账户类型(0:管理员，1:普通用户，2:VIP用户)',
	`status` tinyint(4) NOT NULL COMMENT '状态(0:正常，1:非正常)',
	`question` varchar(32)  NOT NULL COMMENT '密码提示问题(0:没有密码提示问题，1:我的真实姓名，2:我的女朋友姓名，3:我的身份证号码)',
	`answer` varchar(32)  NOT NULL COMMENT '密码提示问题答案(0:没有密码提示问题)',
	`createdTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`updatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
	PRIMARY KEY('id')
) ENGINE=InonoDB DEFAULT CHARSET=utf8 COMMENT='账户';


-- Create syntax for TABLE 'core_user_bill'
CREATE TABLE 'everyday_record'.'core_user_bill'(
	`id` INT(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
	`accountID` int(11) unsigned NOT NULL COMMENT '用户accountID',
	`ways` tinyint(4) NOT NULL COMMENT '消费方式(1:天猫超市，2:京东超市，3:天猫淘宝购物，4:京东购物，5:当当网购物，6:亚马逊购物，7:现金消费，10:其它)',
	`type` tinyint(4) NOT NULL COMMENT '消费用途(1:生活用品，2:书本，3:电子产品，4:公交地铁，5:饭卡充值，6:餐饮，7:礼品赠品，8:其它)',
	`money` decimal(10,2) unsigned NOT NULL COMMENT '消费金额',
	`createdTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`updatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
	PRIMARY KEY('id'),
	KEY `fk_user_bill_account_id` (`accountID`),
	CONSTRAINT `fk_user_bill_account_id` FOREIGN KEY (`accountID`) REFERENCES `core_account` (`id`)
) ENGINE=InonoDB DEFAULT CHARSET=utf8 COMMENT='用户记账';


-- Create syntax for TABLE 'core_user_memo'
CREATE TABLE 'everyday_record'.'core_user_bill'(
	`id` INT(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
	`accountID` int(11) unsigned NOT NULL COMMENT '用户accountID',
	`theme` varchar(32) NOT NULL COMMENT '主题',
	`time` datetime NOT NULL COMMENT '备忘录时间',
	`content` varchar(255) NOT NULL COMMENT '内容',
	`createdTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`updatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
	PRIMARY KEY('id'),
	KEY `fk_user_bill_memo_id` (`accountID`),
	CONSTRAINT `fk_user_bill_memo_id` FOREIGN KEY (`accountID`) REFERENCES `core_account` (`id`)
) ENGINE=InonoDB DEFAULT CHARSET=utf8 COMMENT='用户备忘录';

-- Create syntax for TABLE 'core_user_breaking_new'
CREATE TABLE 'everyday_record'.'core_user_breaking_new'(
	`id` INT(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
	`accountID` int(11) unsigned NOT NULL COMMENT '用户accountID',
	`theme` varchar(32) NOT NULL COMMENT '主题',
	`time` datetime NOT NULL COMMENT '时间',
	`figure` varchar(32) NOT NULL COMMENT '人物',
	`content` varchar(255) NOT NULL COMMENT '内容',
	`createdTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`updatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
	PRIMARY KEY('id'),
	KEY `fk_user_breaking_new_id` (`accountID`),
	CONSTRAINT `fk_user_breaking_new_id` FOREIGN KEY (`accountID`) REFERENCES `core_account` (`id`)
) ENGINE=InonoDB DEFAULT CHARSET=utf8 COMMENT='用户大事件';

-- Create syntax for TABLE 'core_user_study_plan'
CREATE TABLE 'everyday_record'.'core_user_study_plan'(
	`id` INT(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
	`accountID` int(11) unsigned NOT NULL COMMENT '用户accountID',
	`subject` varchar(32) NOT NULL COMMENT '学科(1:计算机)',
	`category` varchar(32) NOT NULL COMMENT '类别(1:数据库，2:Node.js，3:源码，4:NPM模块，5:架构，6:JavaScript，7:React，8:HTML+CSS，9:其它)',
	`planTime` datetime NOT NULL COMMENT '计划完成时间',
	`actualTime` datetime  COMMENT '实际完成时间',
	`finish` tinyint(2) NOT NULL DEFAULT 0 COMMENT '是否完成(0:未完成，1:完成)',
	`cause` varchar(255)  COMMENT '未按时完成原因',
	`content` varchar(255) NOT NULL COMMENT '学习内容',
	`createdTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`updatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
	PRIMARY KEY('id'),
	KEY `fk_user_study_plan_id` (`accountID`),
	CONSTRAINT `fk_study_plan_id` FOREIGN KEY (`accountID`) REFERENCES `core_account` (`id`)
) ENGINE=InonoDB DEFAULT CHARSET=utf8 COMMENT='用户学习计划';

-- Create syntax for TABLE 'core_user_study_experience'
CREATE TABLE 'everyday_record'.'core_user_study_experience'(
	`id` INT(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
	`accountID` int(11) unsigned NOT NULL COMMENT '用户accountID',
	`subject` varchar(32) NOT NULL COMMENT '学科(1:计算机)',
	`category` varchar(32) NOT NULL COMMENT '类别(1:数据库，2:Node.js，3:源码，4:NPM模块，5:架构，6:JavaScript，7:React，8:HTML+CSS，9:其它)',
	`content` varchar(255) NOT NULL COMMENT '学习心得',
	`createdTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`updatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
	PRIMARY KEY('id'),
	KEY `fk_user_study_experience_id` (`accountID`),
	CONSTRAINT `fk_user_study_experience_id` FOREIGN KEY (`accountID`) REFERENCES `core_account` (`id`)
) ENGINE=InonoDB DEFAULT CHARSET=utf8 COMMENT='用户学习心得';