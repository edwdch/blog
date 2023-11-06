---
top: 3
sticky: 1
description: Windows 速查端口占用
date: 2023-07-04 19:14:00
tag:
 - Windows
---

# Windows 速查端口占用

::: tip
以下命令需要使用管理员权限执行
:::

- 如查找 80 端口占用情况


```powershell
Get-NetTCPConnection -LocalPort 80 | ForEach-Object { Get-Process -Id $_.OwningProcess }
```

::: details 正常情况下的输出
```
 NPM(K)    PM(M)      WS(M)     CPU(s)      Id  SI ProcessName
 ------    -----      -----     ------      --  -- -----------
    459   255.53     271.67      18.23   21436   2 QQMusic
    459   255.53     271.67      18.23   21436   2 QQMusic
    459   255.53     271.67      18.23   21436   2 QQMusic
    459   255.53     271.67      18.23   21436   2 QQMusic
```
:::

::: details 查找不到结果的输出
```
Get-NetTCPConnection: No MSFT_NetTCPConnection objects found with property 'LocalPort' equal to '80'.  Verify the value of the property and retry.
```
:::