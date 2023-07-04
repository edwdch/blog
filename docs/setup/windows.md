---
top: 1
sticky: 1
description: Windows 开发环境快速配置
date: 2023-07-02 09:43:00
tag:
 - 快速配置
 - Windows
---

# Windows 开发环境快速配置

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

## Font

- 编程字体 [Fica Code](https://github.com/tonsky/FiraCode/releases/latest)。
- 中文字体 [Noto Sans Simplified Chinese](https://fonts.google.com/noto/specimen/Noto+Sans+SC)
