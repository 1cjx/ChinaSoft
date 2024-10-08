package com.chinasoft.backend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.chinasoft.backend.model.entity.Subscribe;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 * @author 姜堂蕴之
 * @description 针对表【subscribe(用户订阅记录表)】的数据库操作Mapper
 * @createDate 2024-04-09 11:20:51
 * @Entity com.chinasoft.backend.model.entity.Subscribe
 */
@Mapper
public interface SubscribeMapper extends BaseMapper<Subscribe> {

    /**
     * 获取订阅次数排名前四的设施列表。
     * 仅包含设施ID和订阅数字段。
     * @return 订阅次数排名前四的设施列表
     */
    @Select("SELECT facility_id, COUNT(*) as subscribeCount " +
            "FROM subscribe " +
            "WHERE facility_type = 0 " +
            "GROUP BY facility_id " +
            "ORDER BY subscribeCount DESC " +
            "LIMIT 4")
    List<Map> getTopFourFacilitiesBySubscribeCount();
}




