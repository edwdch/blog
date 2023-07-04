---
top: 4
sticky: 1
description: Windows 挂载 Linux 目录
date: 2023-07-04 21:21:00
tag:
 - Windows
 - ssh
---

# Windows 挂载 Linux 目录

## Linux 准备

安装 `openssh-server`。

## Windows 准备

使用 WinGet 安装 `WinFsp` 和 [SSHFS-Win](https://github.com/winfsp/sshfs-win)。

```bash
winget install WinFsp.WinFsp; winget install SSHFS-Win.SSHFS-Win
```

假设有一台 Linux 机器，信息如下：

| IP 地址      | 用户名 | 密码 |
| ------------ | ------ | ---- |
| 1.2.3.4 | example_user | example_password |

将此机器上用户目录挂载为 Windows 的磁盘 `X:`。

```bash
net use X: \\sshfs\example_user@1.2.3.4 example_password
```

删除挂载的磁盘

```bash
net use X: /delete
```
