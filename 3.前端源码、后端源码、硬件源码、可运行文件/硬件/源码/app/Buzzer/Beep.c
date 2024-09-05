/******************************************************************************\
**  文件名称 :  Beep.c
**  功能描述 :  蜂鸣器控制
\******************************************************************************/

/******************************************************************************\
                                 Includes
\******************************************************************************/
#include "Beep.h"


/******************************************************************************\
                             Variables definitions
\******************************************************************************/
#define BUZZER_TASK_STACK_SIZE      1024                   	//任务栈大小
#define BUZZER_TASK_PRIO            30                     	//任务优先等级
#define BEEP_PIN                 	9                      	//蜂鸣器引脚
#define BUZZER_HZ					36000

static hi_u16 hz = BUZZER_HZ;

static TS_BUZZER_INFO s_Buzzer;

/******************************************************************************\
                             Functions definitions
\******************************************************************************/
/*
* 函数名称 : BuzzerOn
* 功能描述 : 蜂鸣器开
* 参    数 : 无
* 返回值   : 无
* 示    例 : BuzzerOn();
*/
/******************************************************************************/ 
static void BuzzerOn(void)
/******************************************************************************/ 
{
	if(s_Buzzer.OffFlg == 0)
	{
		s_Buzzer.OffFlg = 1;
		hi_pwm_start(HI_PWM_PORT_PWM0, hz/2, hz);
	}
}

void Buzzer_HZ(hi_u16 hz_t)
{
	hz = hz_t;
}
/*
* 函数名称 : BuzzerOff
* 功能描述 : 蜂鸣器关
* 参    数 : 无
* 返回值   : 无
* 示    例 : BuzzerOff();
*/
/******************************************************************************/ 
static void BuzzerOff(void)
/******************************************************************************/ 
{
	
	hi_pwm_stop(HI_PWM_PORT_PWM0);
	s_Buzzer.OffFlg = 0;
}

/*
* 函数名称 : BuzzerControl
* 功能描述 : 蜂鸣器控制
* 参    数 : Buz - 蜂鸣器控制结构体指针
* 返回值   : 无
* 示    例 : BuzzerControl(&Buz);
*/
/******************************************************************************/ 
static void BuzzerControl(TS_BUZZER_INFO *Buz)
/******************************************************************************/ 
{
	switch(Buz->State)
	{
		case BUZZER_ON:
			BuzzerOn();
		break;
		
		case BUZZER_OFF:
			BuzzerOff();
		break;
		
		case BUZZER_ALARM:
			if(Buz->Timer < Buz->Duty)
			{
				BuzzerOn();
			}
			else
			{
				BuzzerOff();
			}
			if(Buz->Timer >= Buz->Period)
			{
				Buz->Timer = 0;
				
				if(Buz->AlarmTimes)
				{
					Buz->AlarmTimes--;
				}
				if(Buz->AlarmTimes == 0)
				{
					Buz->State = BUZZER_OFF;
					BuzzerOff();
				}
			}
		break;
			
		case BUZZER_KEEP_ALARM:
			if(Buz->Timer < Buz->Duty)
			{
				BuzzerOn();
			}
			else
			{
				BuzzerOff();
			}
			if(Buz->Timer >= Buz->Period)
			{
				Buz->Timer = 0;
			}
		break;
			
		default:
			BuzzerOff();
		break;
	}
	
	s_Buzzer.Timer += 10;
}



/*
* 函数名称 : BUZZER_Drv
* 功能描述 : 蜂鸣器驱动，需放到10ms时间片中
* 参    数 : 无
* 返回值   : 无
* 示    例 : BUZZER_Drv();
*/
/******************************************************************************/ 
void BUZZER_Drv(void)
/******************************************************************************/ 
{
	BuzzerControl(&s_Buzzer);
}

/*
* 函数名称 : BUZZER_Init
* 功能描述 : 蜂鸣器初始化
* 参    数 : Buz - 蜂鸣器控制结构体指针
* 返回值   : 无
* 示    例 : BUZZER_Init();
*/
/******************************************************************************/ 
void BUZZER_Init(void)
/******************************************************************************/ 
{
    hi_io_set_func(BEEP_PIN_NAME,BEEP_PIN_MODE); 
    hi_pwm_init(BEEP_PIN_PWM_NUM);
    hi_pwm_set_clock(PWM_CLK_XTAL);  
	BuzzerOff();
	printf("\r\n[BUZZER_Init] BUZZER_Init OK!!!\n");

}

/*
* 函数名称 : BUZZER_Drv
* 功能描述 : 蜂鸣器工作方式设置
* 参    数 : State - 工作方式 
			 Duty - 鸣叫占空比 
			 Period - 鸣叫周期 
			 Times - 鸣叫次数
* 返回值   : 无
* 示    例 : BUZZER_Set(State,Duty,Period,Times)
*/
/******************************************************************************/ 
void BUZZER_Set(uint8_t State,uint16_t Duty,uint16_t Period,uint16_t Times)
/******************************************************************************/ 
{
	s_Buzzer.State = State;
	s_Buzzer.Duty = Duty;
	s_Buzzer.Period = Period;
	s_Buzzer.AlarmTimes = Times;
	s_Buzzer.Timer = 0;
}

// 音符频率
static float tuneFreqs_rax[] =
{
	0, // 休止符
	1046.502, // C5
	1174.659, // D5
	1318.510, // E5
	1396.913, // F5
	1567.982, // G5
	1760.000, // A5
	1975.533, // B5
	523.251, // C4
	587.330, // D4
	659.255, // E4
	698.456, // F4
	783.991, // G4
	880.000, // A4
	987.767, // B4
	261.626, // C3
	293.665, // D3
	329.628, // E3
	349.228, // F3
	391.995, // G3
	440.000, // A3
	493.883, // B3
	130.813, // C2
	146.832, // D2
	164.814, // E2
	174.614, // F2
	195.998, // G2
	220.000, // A2
	246.942, // B2
	65.406, // C1
	73.416, // D1
	82.407, // E1
	87.307, // F1
	97.999, // G1
	110.000, // A1
	123.471, // B1
};
// 曲谱音阶偏移
static uint8_t offset = 0;
// 曲谱音符
static uint8_t g_notes[128];
// 曲谱时值
static uint8_t g_durations[128];
static uint8_t g_notes_len = 0;

static int ready = 1;				// 信号量
static int interrupt = 0;			// 中断标志
static float volume_level = 0.5;	// 音量

void Buzzer_setMusic(uint8_t *notes, uint8_t *durations, uint8_t notes_len, uint8_t offset_t){
	interrupt = 1;
	while(0 == ready){
		usleep(1000);
	}
	ready = 0;

	g_notes_len = notes_len;
	offset = offset_t;
	memcpy(g_notes, notes, notes_len);
	memcpy(g_durations, durations, notes_len);
	// printf("Buzzer_setMusic %d\r\n", notes_len);

	ready = 1;
}

/*
* 函数名称 : Buzzer_Task
* 功能描述 : 蜂鸣器任务
* 参    数 : 空
* 返回值   : 空
* 示    例 : Buzzer_Task(&argument);
*/
/******************************************************************************/ 
void Buzzer_Task(void *argument)
/******************************************************************************/ 
{
    BUZZER_Init();			//初始化IO

    while (1)
    {
        while(0 == ready){
            usleep(1000);
        }
        ready = 0;
		interrupt = 0;

        for (size_t i = 0; !interrupt && i < g_notes_len; i++){
            uint32_t tune = g_notes[i] + 7 * offset; // 音符
            uint16_t freqDivisor = 40 * 1e6 / tuneFreqs_rax[tune];  //获取 频率
            uint32_t tuneInterval = g_durations[i] * (125 * 1000); // 音符时间   ，节拍，
            // printf("%d %d %d\r\n", tune, freqDivisor, tuneInterval);
            hi_pwm_start(BEEP_PIN_PWM_NUM, freqDivisor * volume_level, freqDivisor);
            usleep(tuneInterval);//持续响tuneInterval时间，
            hi_pwm_stop(BEEP_PIN_PWM_NUM);
        }

		ready = 1;
        usleep(10*1000);
    }
}
/*
* 函数名称 : Buzzer_Demo
* 功能描述 : 创建蜂鸣器任务
* 参    数 : 空
* 返回值   : 空
* 示    例 : Buzzer_Demo(void);
*/
/******************************************************************************/ 
void Buzzer_Demo(void)
/******************************************************************************/ 
{
    osThreadAttr_t attr;

    attr.name       = "Buzzer-Task";
    attr.attr_bits  = 0U;
    attr.cb_mem     = NULL;
    attr.cb_size    = 0U;
    attr.stack_mem  = NULL;
    attr.stack_size = BUZZER_TASK_STACK_SIZE;
    attr.priority   = BUZZER_TASK_PRIO;

    if (osThreadNew((osThreadFunc_t)Buzzer_Task, NULL, &attr) == NULL) {
        printf("\r\n[Buzzer_Demo] Falied to create buzzer task!\n");
    }else{
        printf("\r\n[Buzzer_Demo] Succ to create buzzer task!\n");
    }
}

APP_FEATURE_INIT(Buzzer_Demo);
/******************************* End of File (C) ******************************/

