#include "MQTTPacket.h"
#include "transport.h"
#include <stdint.h>
#include <stdbool.h>
#include "main.h"

/******************************************************************************\
							  Variables definitions
\******************************************************************************/
#define HOST_ADDR 						"120.46.211.213"	// MQTT服务器的IP地址
#define HOST_PORT 						1883				// MQTT服务器的端口号
//------------------------------------------------------------------------------

static char buff[64]; // 中转缓冲区

/*
 * Function: mqtt_connect
 * Description: 连接MQTT服务器并执行任务
 * Parameters: None
 * Return: 0:成功 -1:失败
 */
int mqtt_connect(void)
{
	MQTTPacket_connectData data = MQTTPacket_connectData_initializer;
	int mysock = 0;
	unsigned char buf[200];
	int buflen = sizeof(buf);
	int msgid = 1;
	MQTTString topicString = MQTTString_initializer;
	int req_qos = 0;
	char payload[200] = "{'msg': 'test'}"; // 发送数据
	// int payloadlen = strlen(payload);
	int len = 0;
	char *host = HOST_ADDR; // MQTT服务器的IP地址
	int port = 1883;

	// 打开一个接口，并且和服务器 建立连接，创建socket连接mqtt服务器函数
	mysock = transport_open(host, port);
	DEBUG printf("mysock:%d\r\n", mysock);
	if (mysock < 0)
	{
		return mysock;
	}

	DEBUG printf("Sending to hostname %s port %d\n", host, port);

	sprintf(buff, "IoT_%d_%d_%d_music", deviceId, facilityId, facilityType);
	data.clientID.cstring = buff; // 修改成自己名称，
	data.keepAliveInterval = 60;	// 心跳时间
	data.cleansession = 1;
	data.username.cstring = "hi3861";
	data.password.cstring = "******";
	// 数据封装成数据报文
	len = MQTTSerialize_connect(buf, buflen, &data);
	// 以TCP方式发送数据, <0发送数据失败
	transport_sendPacketBuffer(mysock, buf, len);

	/* wait for connack读取服务器返回的报文是否是connack */
	if (MQTTPacket_read(buf, buflen, transport_getdata) == CONNACK)
	{
		unsigned char sessionPresent, connack_rc;

		if (MQTTDeserialize_connack(&sessionPresent, &connack_rc, buf, buflen) != 1 || connack_rc != 0)
		{
			printf("Unable to connect, return code %d\n", connack_rc);
			goto exit;
		}
	}
	else
		goto exit;

	/* subscribe 订阅主题 */
	sprintf(buff + 16, "M/%d", facilityId);
	topicString.cstring = buff + 16;
	len = MQTTSerialize_subscribe(buf, buflen, 0, msgid, 1, &topicString, &req_qos); // 打包橙订阅主题包保存在buf中
	transport_sendPacketBuffer(mysock, buf, len);									 // 客户端发送订阅主题至服务器
	if (MQTTPacket_read(buf, buflen, transport_getdata) == SUBACK)					 /* 等待服务器返回订阅主题ACK响应包 */
	{
		unsigned short submsgid;
		int subcount;
		int granted_qos;

		MQTTDeserialize_suback(&submsgid, 1, &subcount, &granted_qos, buf, buflen);
		if (granted_qos != 0)
		{
			printf("granted qos != 0, %d\n", granted_qos);
			goto exit;
		}
	} else goto exit;

	while (1)
	{
		while (MQTTPacket_read(buf, buflen, transport_getdata) == PUBLISH)
		{
			unsigned char dup;
			int qos;
			unsigned char retained;
			unsigned short msgid;
			int payloadlen_in;
			unsigned char *payload_in;
			MQTTString receivedTopic;

			// MQTTSerialize_publish  构造PUBLISH报文的函数，需要发送消息的依靠此函数构造报文
			// MQTTDeserialize_publish  函数是解析PUBLISH报文的函数，接收消息就靠它
			MQTTDeserialize_publish(&dup, &qos, &retained, &msgid, &receivedTopic, &payload_in, &payloadlen_in, buf, buflen);
			DEBUG printf("message arrived %d,%s\n", payloadlen_in, payload_in);
			payload_in[payloadlen_in] = '\0';	// 截取有效的payload数据
			int music_cmd = atoi(payload_in);	// 将payload数据转换成整型
			if(music_id != music_cmd) int_music_flag = true;	// 切换音乐标志
			music_id = music_cmd;		// 更新音乐ID
		}

		// 心跳包 重连
		if(MQTTPacket_read(buf, buflen, transport_getdata) == DISCONNECT){
			transport_sendPacketBuffer(mysock, buf, len);
			if (MQTTPacket_read(buf, buflen, transport_getdata) == SUBACK)
			{
				unsigned short submsgid;
				int subcount;
				int granted_qos;

				MQTTDeserialize_suback(&submsgid, 1, &subcount, &granted_qos, buf, buflen);
				if (granted_qos != 0) goto exit;
			}
			else goto exit;
		}

		usleep(1000*1000);
	}
exit:
	printf("disconnecting\n");
	len = MQTTSerialize_disconnect(buf, buflen);
	transport_sendPacketBuffer(mysock, buf, len); // 客户端发送发布主题包至服务器
	transport_close(mysock);

	return 0;
}