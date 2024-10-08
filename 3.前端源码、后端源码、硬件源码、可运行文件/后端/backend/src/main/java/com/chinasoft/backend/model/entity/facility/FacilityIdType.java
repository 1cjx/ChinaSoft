package com.chinasoft.backend.model.entity.facility;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 设施id和类型
 *
 * @author 孟祥硕
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FacilityIdType {
    /**
     * 设施ID
     */
    private Long facilityId;

    /**
     * 设施类型
     */
    private Integer facilityType;

}
