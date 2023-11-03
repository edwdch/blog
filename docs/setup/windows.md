---
top: 1
sticky: 1
description: Windows 快速配置
date: 2023-07-02 09:43:00
tag:
 - 快速配置
 - Windows
---

#  Windows 快速配置

## JetBrains

通过 [JetBrains Toolbox](https://www.jetbrains.com/zh-cn/lp/toolbox) 来安装所需要的 IDE。

如果无法通过 Toolbox 的页面设置 IDE 的安装位置，则需要通过配置文件修改。

配置文件路径为 `C:\Users\%USERNAME%\AppData\Local\JetBrains\Toolbox\.settings.json`。

如需设置 IDE 安装路径为 `"E:\apps\JetBrains`，则向该文件添加内容：

```json
{
    "install_location": "E:\\apps\\JetBrains",
    // others ...
}
```

## Node.js

我们通常不会直接安装 Node.js，而是使用 [nvm-windows](https://github.com/coreybutler/nvm-windows) 来管理 Node.js 的版本。Linux 环境下我们使用 [nvm](https://github.com/nvm-sh/nvm) 。

配置镜像源以加速下载

```bash
nvm node_mirror https://npmmirror.com/mirrors/node
nvm npm_mirror https://npmmirror.com/mirrors/npm
```
必要时可以恢复默认源（留空即可）

```bash
nvm node_mirror
nvm npm_mirror
```
查询 LTS 版本

```bash
nvm list available
```
::: details nvm list available
|   CURRENT    |     LTS      |  OLD STABLE  | OLD UNSTABLE |
|--------------|--------------|--------------|--------------|
|    20.3.1    |   18.16.1    |   0.12.18    |   0.11.16    |
|    20.3.0    |   18.16.0    |   0.12.17    |   0.11.15    |
|    20.2.0    |   18.15.0    |   0.12.16    |   0.11.14    |
|    20.1.0    |   18.14.2    |   0.12.15    |   0.11.13    |
|    20.0.0    |   18.14.1    |   0.12.14    |   0.11.12    |
|    19.9.0    |   18.14.0    |   0.12.13    |   0.11.11    |
|    19.8.1    |   18.13.0    |   0.12.12    |   0.11.10    |
|    19.8.0    |   18.12.1    |   0.12.11    |    0.11.9    |
|    19.7.0    |   18.12.0    |   0.12.10    |    0.11.8    |
|    19.6.1    |   16.20.1    |    0.12.9    |    0.11.7    |
|    19.6.0    |   16.20.0    |    0.12.8    |    0.11.6    |
|    19.5.0    |   16.19.1    |    0.12.7    |    0.11.5    |
|    19.4.0    |   16.19.0    |    0.12.6    |    0.11.4    |
|    19.3.0    |   16.18.1    |    0.12.5    |    0.11.3    |
|    19.2.0    |   16.18.0    |    0.12.4    |    0.11.2    |
|    19.1.0    |   16.17.1    |    0.12.3    |    0.11.1    |
|    19.0.1    |   16.17.0    |    0.12.2    |    0.11.0    |
|    19.0.0    |   16.16.0    |    0.12.1    |    0.9.12    |
|   18.11.0    |   16.15.1    |    0.12.0    |    0.9.11    |
|   18.10.0    |   16.15.0    |   0.10.48    |    0.9.10    |

This is a partial list. For a complete list, visit https://nodejs.org/en/download/releases
:::

安装最新的 LTS 版本

```bash
nvm install lts
```

安装指定版本

```bash
nvm install 18
```

检查安装
  
```bash
node -v
npm -v
```

## NPM Packages

安装常用 NPM 包前，记得配置镜像源以加速下载

```bash
npm config set registry http://registry.npmmirror.com

```
- [pnpm](https://pnpm.io) 是一个更快的包管理器，可以使用以下命令安装

```bash
npm install -g pnpm
```

最好为 pnpm 设置 store，如设置为 `E:\data\pnpm-store`。

```
pnpm config set store-dir E:\data\pnpm-store
```

- [antfu/ni](https://github.com/antfu/ni) 可以便捷切换使用的包管理器

```bash
npm install -g @antfu/ni
```

## JDK

使用 [BellSoft Liberica JDK](https://bell-sw.com/pages/downloads) 作为 Java 开发环境，避免 Oracle JDK 的许可问题。

假定 JDK 安装在 `C:\Program Files\BellSoft\JDK-11`，使用以下 `powershell` 命令进行配置。

- Java Home 环境变量

```powershell
$javaHomePath = "C:\Program Files\BellSoft\JDK-11"
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", $javaHomePath, "User")
```
- 增加到 Path 环境变量

```powershell
$currentPath = [System.Environment]::GetEnvironmentVariable("Path", "User")
$newPath = $currentPath + ";%JAVA_HOME%\bin"
[System.Environment]::SetEnvironmentVariable("Path", $newPath, "User")
```

- 验证安装
```bash
java -version
javac -version
javap -version
```

## Python

使用 [Miniforge3](https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Windows-x86_64.exe) 来安装 Python。

## Powershell

下载安装 [PowerShell 7](https://www.microsoft.com/store/apps/9MZ1SNWT0N5D)。

安装 [Terminal-Icons](https://github.com/devblackops/Terminal-Icons) 模块

```powershell
Install-Module -Name Terminal-Icons -Repository PSGallery
```

编辑配置文件 `C:\Users\%USERNAME%\Documents\PowerShell\Microsoft.PowerShell_profile.ps1`，添加以下内容：

```powershell
# === antfu/ni ===
# https://github.com/antfu/ni#conflicts-with-powershell
Remove-Item Alias:ni -Force -ErrorAction Ignore
Remove-Item Alias:mi -Force -ErrorAction Ignore

# === inport module === 
# https://github.com/devblackops/Terminal-Icons#installation
Import-Module -Name Terminal-Icons

# PSReadLine
Set-PSReadLineOption -PredictionSource History


```

外观配置如下：

| 配置项 | 值 |
| --- | --- |
| 颜色主题 | Tango Dark |
| 字体 | Fira Code |
| 字体大小 | 11 |
| 行高 | 1.2 |
| 背景不透明度 | 85% |
| 启用亚克力材料 | 是 |

## Apps

- Git [Git for Windows](https://git-scm.com/download/win) & [Git Extensions](https://github.com/gitextensions/gitextensions/releases/latest)
- 下载工具 [Internet Download Manager](https://www.internetdownloadmanager.com/download.html)
- 解压缩工具 [Bandizip](https://www.bandisoft.com/bandizip)
- 视频播放器 [PotPlayer](https://potplayer.daum.net)
- Markdown 编辑器 [Typora](https://download.typora.io/windows/typora-setup-x64.exe)
- Office365 安装工具 [Office Tool Plus](https://otp.landian.vip/zh-cn/download.html)
- 截图工具 [Snipaste](https://www.microsoft.com/store/apps/9P1WXPKB68KX)
- 快捷启动 [uTools](https://u.tools/download.html)
- 密码管理 [Keepass 2](https://keepass.info/download.html)
- 性能监测 [MSI Afterburner](https://www.msi.com/Landing/afterburner)
- 文本编辑 [Notepad++](https://notepad-plus-plus.org/downloads)
- 请求调试 [Postman](https://www.postman.com/downloads)
- MongoDB 客户端 [Studio 3T](https://studio3t.com/download)
- SSH 客户端 [Termius](https://www.termius.com/windows)

## Font

- 编程字体 [Fica Code](https://github.com/tonsky/FiraCode/releases/latest)。
- 中文字体 [Noto Sans Simplified Chinese](https://fonts.google.com/noto/specimen/Noto+Sans+SC)
