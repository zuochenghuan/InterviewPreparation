# TCP & UDP
### 一、区别
![](media/15350053140121/15350053370429.jpg)


### 二、TCP协议如何保证可靠传输

1、确认和重传：接收方收到报文就会确认，发送方发送一段时间后没有收到确认就会重传。

2、数据校验：TCP报文头有校验和，用于校验报文是否损坏

3、数据合理分片和排序：

tcp会按最大传输单元(MTU)合理分片，接收方会缓存未按序到达的数据，重新排序后交给应用层。

而UDP：IP数据报大于1500字节，大于MTU。这个时候发送方的IP层就需要分片，把数据报分成若干片，是的每一片都小于MTU。而接收方IP层则需要进行数据报的重组。由于UDP的特性，某一片数据丢失时，接收方便无法重组数据报，导致丢弃整个UDP数据报。

4、流量控制：当接收方来不及处理发送方的数据，能通过滑动窗口，提示发送方降低发送的速率，防止包丢失。

5、拥塞控制：当网络拥塞时，通过拥塞窗口，减少数据的发送，防止包丢失。


