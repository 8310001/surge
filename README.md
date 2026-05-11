# Surge Modules

这个仓库用于存放可直接安装的 Surge 模块。

## ChatGPT AccessToken 捕获

- 模块地址：`https://raw.githubusercontent.com/8310001/surge/main/modules/chatgpt-session/chatgpt_session_log.sgmodule`
- AccessToken 捕获脚本：`https://raw.githubusercontent.com/8310001/surge/main/modules/chatgpt-session/chatgpt_session_log.js`
- 请求命中调试脚本：`https://raw.githubusercontent.com/8310001/surge/main/modules/chatgpt-session/chatgpt_request_debug.js`

### 用途

1. 访问 `https://chatgpt.com/` 任意路径时，在 Surge 日志里输出请求命中记录。
2. 访问 `https://chatgpt.com/api/auth/session` 时，捕获响应中的 `accessToken`。
3. 捕获成功后发送通知，点击通知并确认后复制 `accessToken` 到剪切板。

### 安全说明

脚本不会在日志或通知正文显示完整 `accessToken`，只显示掩码、长度、账号与过期时间。完整 Token 只会作为 Surge 通知的 `clipboard` 动作文本传给本机剪切板。

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
6. 看到 `ChatGPT AccessToken 捕获` 通知后，点击通知并确认复制。

注意：Surge 官方剪切板动作需要用户点击通知并确认，不能完全静默写入剪切板。
