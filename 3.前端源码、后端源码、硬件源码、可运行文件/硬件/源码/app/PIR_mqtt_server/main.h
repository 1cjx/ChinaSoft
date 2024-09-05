#ifndef MAIN_H
#define MAIN_H

void connect_wifi(const char*, const char*);
int mqtt_connect(void);

#define SSID "xc"                       // WIFI名称
#define PASSWORD "xuchang408"           // WIFI密码

extern uint8_t Get_Human_Status(void);  // 获取人体状态
extern int facilityId;                  // 设施ID
extern int facilityType;                // 设施类型
extern int deviceId;                    // 设备ID

void lamp_set(int x);

#define DEBUG if(1)

#endif // MAIN_H