---
top: 2
sticky: 1
description: 使用注册表为微软输入法快速配置小鹤双拼
date: 2023-07-02 08:39:00
tag:
 - 小鹤双拼
 - 快速配置
---

# 小鹤双拼配置

将以下内容保存为 `xiaohe.reg` 文件，双击导入注册表即可。

```reg
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\SOFTWARE\Microsoft\InputMethod\Settings\CHS]
"EnableExtraDomainType"=dword:00000001
"EnableSmartSelfLearning"=dword:00000000
"EnableVMode"=dword:00000000
"EnableHap"=dword:00000000
"EnablePeopleName"=dword:00000000
"DoublePinyinScheme"=dword:0000000a
"EnableUMode"=dword:00000000
"EnableSmartFuzzyPinyin"=dword:00000000
"UserDefinedDoublePinyinScheme0"="小鹤双拼*2*^*iuvdjhcwfg^xmlnpbksqszxkrltvyovt"
"Enable Dynamic Candidate Ranking"=dword:00000000
"Enable self-learning"=dword:00000000
"Expand Double Pinyin"=dword:00000000
"Enable Double Pinyin"=dword:00000001
"LangBar Force On"=dword:00000000
"PinyinMixEnable"=dword:00000000
"ToolBarEnabled"=dword:00000000
```
