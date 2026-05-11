# Surge Modules

这个仓库用于存放可直接安装的 Surge 模块。

## ChatGPT Session 调试捕获

- 模块地址：`https://raw.githubusercontent.com/8310001/surge/main/modules/chatgpt-session/chatgpt_session_log.sgmodule`
- Session 响应脚本：`https://raw.githubusercontent.com/8310001/surge/main/modules/chatgpt-session/chatgpt_session_log.js`
- 请求命中调试脚本：`https://raw.githubusercontent.com/8310001/surge/main/modules/chatgpt-session/chatgpt_request_debug.js`

### 用途

1. 访问 `https://chatgpt.com/` 任意路径时，在 Surge 日志里输出请求命中记录。
2. 访问 `https://chatgpt.com/api/auth/session` 时，打印响应概要并发送通知。

### 安全说明

该脚本不会保存完整响应 body，也不会复制 accessToken/session token；只显示账号、过期时间、字段列表等概要信息。

### 使用

在 Surge 中添加模块 URL：

```text
https://raw.githubusercontent.com/8310001/surge/main/modules/chatgpt-session/chatgpt_session_log.sgmodule
```

然后：

1. 启用该模块。
2. 开启 MITM。
3. 安装并信任 Surge CA 证书。
4. 确认 `chatgpt.com` 在 MITM hostname 中。
5. 打开 Surge 日志，访问 ChatGPT。

如果只有 `ChatGPT Request Debug`，没有 `ChatGPT Session`，说明请求有经过 Surge，但 `/api/auth/session` 响应没有被 MITM 解密或没有触发。
