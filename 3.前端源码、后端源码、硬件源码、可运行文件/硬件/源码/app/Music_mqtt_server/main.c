/**
 * @file main.c
 * @brief Music MQTT Client
 *
 * 这个文件包含了Music MQTT客户端的主要功能。
 * 该客户端责接收来自远程服务器的控制指令，以控制音乐的播放。
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
#include "oled_demo.h"
#include "Beep.h"
#include "Key.h"
#include "main.h"
#include "music.h"

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

    DEBUG{
        printf("[Music_mqtt_server] facility: %d\r\n", facilityId);
        printf("[Music_mqtt_server] tag: %d\r\n", facilityType);
        printf("[Music_mqtt_server] device: %d\r\n", deviceId);
    }

    DEBUG printf("[Music_mqtt_server] CONNECTTING WIFI!!!\r\n");
    connect_wifi(SSID, PASSWORD); // 连接WIFI热点

    DEBUG printf("[Music_mqtt_server] CONNECTTING MQTT!!!\r\n");
    mqtt_connect(); // 运行mqtt测试程序
}

int music_id = 0;
bool int_music_flag = false;
/*
* 函数名称 : UpdateOLED
* 功能描述 : 更新OLED显示
* 参    数 : arg
* 返回值   : 无
* 示    例 : 无
*/
static void UpdateOLED(char *arg){
    (void)arg;
    DEBUG printf("[Music_mqtt_server] UpdateOLED thread start!\n");

    char payload[64];
    while(1){
        snprintf(payload, sizeof(payload), "id: %d", deviceId);
        while(!OLED_remote_call(payload)) usleep(10*1000);
        snprintf(payload, sizeof(payload), "fid: %d", facilityId);
        while(!OLED_remote_call(payload)) usleep(10*1000);
        snprintf(payload, sizeof(payload), "type: %d", facilityType);
        while(!OLED_remote_call(payload)) usleep(10*1000);
        snprintf(payload, sizeof(payload), "music: %d", music_id);
        while(!OLED_remote_call(payload)) usleep(10*1000);
        // 播放音乐
        Buzzer_setMusic(g_notes[music_id], g_durations[music_id], g_notes_len[music_id], g_notes_offset[music_id]);
        // 更新OLED显示
        OLED_update();
        usleep(100*1000);
        // 等待按键事件或音乐播放结束
        while(!key_event_flag && !int_music_flag){
            usleep(20 * 1000);
        }
        if(key_event_flag & KEY_EVT_REPEAT){ // 长按，音乐停止
            music_id = 0;
        }else if(key_event_flag & KEY_EVT_PRESSED){ // 短按，切换音乐
            music_id = (music_id + 1) % (sizeof(g_notes_len)/sizeof(g_notes_len[0]));
        }
        key_event_flag = 0; // 清除按键事件标志
        int_music_flag = false; // 清除音乐播放结束标志
    }
}

void Music_mqtt_client(void)
{   
    osThreadAttr_t attr;

    attr.name = "Music_mqtt_client";
    attr.attr_bits = 0U;
    attr.cb_mem = NULL;
    attr.cb_size = 0U;
    attr.stack_mem = NULL;
    attr.stack_size = 4096;
    attr.priority = 36;

    // 在新线程中执行函数Task
    if (osThreadNew((osThreadFunc_t)Task, NULL, &attr) == NULL)
    {
        printf("[Music_mqtt_client] Falied to create Music_mqtt_client!\n");
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
        printf("[Music_mqtt_client] Failed to create UpdateOLED thread!\n");
    }

    AT_RESPONSE_OK;
    // return HI_ERR_SUCCESS;
}

APP_FEATURE_INIT(Music_mqtt_client); // 初始化Music_mqtt_client