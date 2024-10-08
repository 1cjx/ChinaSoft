package com.chinasoft.backend.model.request.facility;

import lombok.Data;

import java.sql.Time;
import java.util.List;

/**
 * 餐饮设施修改请求
 *
 * @author 孟祥硕
 */
@Data
public class RestaurantFacilityUpdateRequest {

    /**
     * id
     */
    private Long id;

    /**
     * 名称
     */
    private String name;

    /**
     * 介绍
     */
    private String introduction;

    /**
     * 经度
     */
    private String longitude;

    /**
     * 维度
     */
    private String latitude;

    /**
     * 最大容纳人数
     */
    private Integer maxCapacity;

    /**
     * 预计吃饭时间（以分钟为单位）
     */
    private Integer expectTime;

    /**
     * 项目类型 可多选（中式快餐/面点/饮品/小吃/西式快餐）
     */
    private String type;


    /**
     * 开放时间
     */
    private Time startTime;

    /**
     * 关闭时间
     */
    private Time closeTime;


    /**
     * 设施照片列表
     */
    private List<String> imageUrls;
}
