/******************************************************************************\
**  版     权：深圳开鸿数字产业发展有限公司（2021）
**  文件名称：key.h
**  功能描述：按键模块化程序，支持短按，长按，连发，组合等按键功能。
**  作     者：王滨泉
**  日     期：2018-01-01
**  版     本：V0.0.1
**  变更记录：1.首次创建
\******************************************************************************/
#ifndef _KEY_H
#define _KEY_H
//------------------------------------------------------------------------------
#ifdef __cplusplus
extern "C" {
#endif
/******************************************************************************\
                             Includes
\******************************************************************************/
#include <stdio.h>
#include <stdbool.h>
#include <unistd.h>
#include <securec.h>

#include "ohos_init.h"
#include "cmsis_os2.h"
#include "ohos_types.h"
#include "iot_errno.h"
#include "iot_gpio.h"
#include "hi_io.h"




/******************************************************************************\
                          Macro definitions
\******************************************************************************/
//io宏定义  
#define KEY0_OLED_PIN                    	(5)  						//GPIO5
#define KEY0_OLED_MODE						(IOT_GPIO_DIR_IN)			//输入
// #define KEY0_LED_PULL					(H_GPIO_PULL_None)			//关闭上拉
// #define KEY0_LED_VALUE					(1)							//高电平
#define KEY0_LED_DOWN_LEVEL             	0  // 根据原理图设计，KEY0按下时引脚为低电平，所以这里设置为0

#define KEY1_TRAFFIC_PIN                    (8)  						//GPIO8
#define KEY1_TRAFFIC_MODE					(IOT_GPIO_DIR_IN)			//输入
#define KEY1_TRAFFIC_DOWN_LEVEL             0  // 根据原理图设计，KEY0按下时引脚为低电平，所以这里设置为0

//----------------------------------------------------------------------------------------
//HAL库函数方式读取IO
// #define KEY0        					((gpio_get_level(GPIO_NUM_5)==KEY0_LED_DOWN_LEVEL)?1:0)  		//KEY0按键GPIO5
// #define KEY1        					((gpio_get_level(GPIO_NUM_4)==KEY1_BIND_DOWN_LEVEL)?1:0)		//KEY1按键GPIO4

// #define KET_VALUE						(/*(KEY3<<3)|(KEY2<<2)|*/(KEY1<<1)|(KEY0)) //每个位代表一个IO的输入电平
//----------------------------------------------------------------------------------------
////键值定义，KeyId
#define KEY_NONE                		0x0000	//无键按下
#define KEY_OLED	                    0x0001	//OLED板按键
#define KEY_TRAFFIC	                    0x0002	//traffic_light板按键



//----------------------------------------------------------------------------------------
//按键时间定义，如短按，长按，重复键
#define KEY_PRESSED_TMR               	(uint32_t)3    		// 30   ms
#define KEY_DOWM_TMR                	(uint32_t)100  		// 1000 ms 
#define KEY_UP_TMR                		(uint32_t)3	 		// 30  ms
#define KEY_REPEAT_TMR                  (uint32_t)5	 		// 50  ms
/******************************************************************************\
                         Typedef definitions
\******************************************************************************/
//按键状态定义
typedef enum
{
	KEY_STATE_INIT = 0,
	KEY_STATE_WOBBLE,
	KEY_STATE_DWON,
	KEY_STATE_WAITUP,
} TE_KEY_STATE;

//按键事件定义
typedef enum
{
	KEY_EVT_NULL    = 0x00,
	KEY_EVT_PRESSED = 0x01,					//短按
	KEY_EVT_DOWN    = 0x02,					//长按
	KEY_EVT_UP      = 0x04,					//抬起
	KEY_EVT_REPEAT  = 0x08,					//连续按
} TE_KEY_EVENT;

//按键属性结构体
typedef struct   
{ 
    uint8_t KeyState;                      // 按键状态         
    uint16_t KeyDwTmr;                     // 按键按下的时间
    uint32_t KeyCur;                       // 记录发生按键事件时的键值
	TE_KEY_EVENT KeyEvent;				   // 按键事件
} TS_KEY_INFO; 
/******************************************************************************\
                    Global variables and functions
\******************************************************************************/

/*
* 函数名称 : KEY_Init
* 功能描述 : 按键初始化函数
* 参     数 : NONE
* 返回值      : NONE
*/
/******************************************************************************/
extern void KEY_Init(void);
/******************************************************************************/  

/*
* 函数名称 : KeyDrv
* 功能描述 : 按键驱动函数,需放10ms的循环时间片中
* 参     数 : NONE
* 返回值      : NONE
*/
/******************************************************************************/
extern void KEY_Drv(void);
/******************************************************************************/  

/*
* 函数名称 : GetKey
* 功能描述 : 获取键值,返回值每一位代表一个按键按下，支持组合按键
* 参     数 : NONE
* 返回值      : 返回按键值
*/
/******************************************************************************/
extern uint32_t GetKey(void);
/******************************************************************************/  

/*
* 函数名称 : IsKey
* 功能描述 : 按键事件判断API
* 参     数 : KeyId:按键ID / KeyEvent:按键事件类型
* 返回值      : true:有KeyEvent事件发生 / fasle:无
*/
/******************************************************************************/
extern bool IsKey(uint32_t KeyId, TE_KEY_EVENT KeyEvent);
/******************************************************************************/  

extern uint32_t key_event_flag;
//------------------------------------------------------------------------------
#ifdef __cplusplus
}
#endif 
#endif
/******************************* End of File (H) ******************************/


