---
top: 3
sticky: 1
description: Windows 端口转发
date: 2023-07-04 19:14:00
tag:
 - Windows
---

# Windows 端口转发

::: tip
以下命令需要使用管理员权限执行
:::

- 将本地的 8000 端口转发到 192.168.2.105 的 80 端口

```bash
netsh interface portproxy add v4tov4 listenport=8000 listenaddress=0.0.0.0 connectport=80 connectaddress=192.168.2.105
```

- 显示所有的端口转发规则

```bash
netsh interface portproxy show all
```

- 删除端口转发规则

```bash
netsh interface portproxy delete v4tov4 listenport=8000 listenaddress=0.0.0.0
```

- 批量设置端口转发

```bash
# 设置IP地址
$connectaddress = "192.168.2.105"

# 创建一个字典，其中键是监听端口，值是目标端口
$portMapping = @{
    8000 = 80
    8001 = 81
    8002 = 82
    8003 = 83
    8004 = 84
}

foreach ($listenport in $portMapping.Keys) {
    $connectport = $portMapping[$listenport]
    netsh interface portproxy add v4tov4 listenport=$listenport listenaddress=0.0.0.0 connectport=$connectport connectaddress=$connectaddress
}

```
