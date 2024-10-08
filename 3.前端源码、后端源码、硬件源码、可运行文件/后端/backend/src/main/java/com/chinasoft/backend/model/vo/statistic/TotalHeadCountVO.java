package com.chinasoft.backend.model.vo.statistic;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Date;

/**
 * 游玩人数信息视图
 *
 * @author 姜堂蕴之
 */
@Data
public class TotalHeadCountVO {

    /**
     * 日期
     */
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Date createTime;

    /**
     * 人数
     */
    private Integer count;

}
