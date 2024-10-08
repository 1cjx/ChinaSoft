package com.chinasoft.backend.model.request.user;

import lombok.Data;

/**
 * 用户注册请求
 *
 * @author 孟祥硕
 */
@Data
public class UserRegisterRequest {
    private static final long serialVersionUID = 3191241716373120793L;

    /**
     * 用户名
     */
    private String username;

    /**
     * 密码
     */
    private String password;

    /**
     * 确认密码
     */
    private String checkPassword;

    /**
     * 手机号
     */
    private String phone;

    /**
     * 用户头像
     */
    private String avatarUrl;

    /**
     * 验证码
     */
    private String code;
}
