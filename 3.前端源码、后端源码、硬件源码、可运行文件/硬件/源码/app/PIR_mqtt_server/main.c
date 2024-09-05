/**
 * @file main.c
 * @brief PIR MQTT Server
 *
 * 这个文件包含了PIR MQTT服务器的主要功能。
 * PIR（Passive Infrared）传感器用于检测人体的存在。
 * 该服务器通过MQTT协议将PIR传感器的数据发送到远程服务器。
 * 该服务器还负责接收来自远程服务器的控制指令，以控制PIR传感器的行为。
 */
/******************************************************************************\
                                 Includes
\******************************************************************************/
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include "ohos_init.h"
#include "cmsis_os2.h"
#include "wifi_device.h"
#include "lwip/netifapi.h"
#include "lwip/api_shell.h"
#include <at.h>
#include <hi_at.h>
#include "hi_wifi_api.h"
#include "lwip/ip_addr.h"
#include <stdbool.h>
#include "main.h"

/******************************************************************************\
                             Variables definitions
\******************************************************************************/
#define DEVICE_ID                       1           // 设备ID
#define FACILITY_ID                     2           // 设施ID
#define FACILITY_TYPE                   0           // 设施类型
//------------------------------------------------------------------------------

/* 设置设施ID、设施类型和设备ID */
int deviceId = DEVICE_ID;
int facilityId = FACILITY_ID;
int facilityType = FACILITY_TYPE;

/*
* 函数名称 : Task
* 功能描述 : MQTT服务器线程
* 参    数 : arg
* 返回值   : 无
* 示    例 : 无
*/
static void Task(void *arg){
    (void)arg;
    DEBUG printf("[RIP_mqtt_server] RIP_mqtt_server thread start!\n");

    DEBUG{
        printf("[RIP_mqtt_server] facility: %d\r\n", facilityId);
        printf("[RIP_mqtt_server] tag: %d\r\n", facilityType);
        printf("[RIP_mqtt_server] device: %d\r\n", deviceId);
    }

    DEBUG printf("[RIP_mqtt_server] CONNECTTING WIFI!!!\r\n");
    connect_wifi(SSID, PASSWORD); // 连接WIFI热点

    DEBUG printf("[RIP_mqtt_server] CONNECTTING MQTT!!!\r\n");
    mqtt_connect(); // 运行mqtt测试程序
}

/*
* 函数名称 : UpdateOLED
* 功能描述 : 更新OLED屏幕线程
* 参    数 : arg
* 返回值   : 无
* 示    例 : 无
*/
static void UpdateOLED(char *arg){
    (void)arg;
    DEBUG printf("[RIP_mqtt_server] UpdateOLED thread start!\n");

    char payload[64];
    while(1){
        snprintf(payload, sizeof(payload), "id: %d", deviceId);
        while(!OLED_remote_call(payload)) usleep(10*1000);
        snprintf(payload, sizeof(payload), "fid: %d", facilityId);
        while(!OLED_remote_call(payload)) usleep(10*1000);
        snprintf(payload, sizeof(payload), "type: %d", facilityType);
        while(!OLED_remote_call(payload)) usleep(10*1000);
        snprintf(payload, sizeof(payload), "det: %d", (int)Get_Human_Status());
        while(!OLED_remote_call(payload)) usleep(10*1000);
        OLED_update();
        usleep(500*1000);
    }
}

/*
* 函数名称 : RIP_mqtt_server
* 功能描述 : MQTT客户端初始化函数
* 参    数 : 无
* 返回值   : 无
* 示    例 : 无
* 该函数用于初始化MQTT发信客户端。
*/
void RIP_mqtt_server(void)
{   
    osThreadAttr_t attr;

    attr.name = "RIP_mqtt_server";
    attr.attr_bits = 0U;
    attr.cb_mem = NULL;
    attr.cb_size = 0U;
    attr.stack_mem = NULL;
    attr.stack_size = 4096;
    attr.priority = 36;

    // 在新线程中执行函数Task
    if (osThreadNew((osThreadFunc_t)Task, NULL, &attr) == NULL)
    {
        printf("[RIP_mqtt_server] Falied to create RIP_mqtt_server!\n");
    }

    osThreadAttr_t attr2;
    attr2.name = "UpdateOLED";
    attr2.attr_bits = 0U;
    attr2.cb_mem = NULL;
    attr2.cb_size = 0U;
    attr2.stack_mem = NULL;
    attr2.stack_size = 4096;
    attr2.priority = 35;

    // 在新线程中执行函数UpdateOLED
    if (osThreadNew((osThreadFunc_t)UpdateOLED, NULL, &attr2) == NULL)
    {
        printf("[RIP_mqtt_server] Failed to create UpdateOLED thread!\n");
    }

    AT_RESPONSE_OK;
    // return HI_ERR_SUCCESS;
}

APP_FEATURE_INIT(RIP_mqtt_server); // 初始化RIP_mqtt_server