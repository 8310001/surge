# Surge Modules

这个仓库用于存放可直接安装的 Surge 模块。

## ChatGPT Session 日志捕获

- 模块地址：`https://raw.githubusercontent.com/8310001/surge/main/modules/chatgpt-session/chatgpt_session_log.sgmodule`
- 脚本地址：`https://raw.githubusercontent.com/8310001/surge/main/modules/chatgpt-session/chatgpt_session_log.js`

### 用途

访问 `https://chatgpt.com/api/auth/session` 时，打印概要日志并发送通知。

### 安全说明

该脚本不会保存完整响应 body，也不会复制 accessToken/session token；只显示账号、过期时间、字段列表等概要信息。

### 使用

在 Surge 中添加模块 URL：

```text
https://raw.githubusercontent.com/8310001/surge/main/modules/chatgpt-session/chatgpt_session_log.sgmodule
```

然后开启 MITM，并信任 Surge 证书。
