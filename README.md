# Surge Modules

这个仓库用于存放可直接安装的 Surge 模块。

## ChatGPT AccessToken 捕获（最小影响版）

- 模块地址：`https://raw.githubusercontent.com/8310001/surge/main/modules/chatgpt-session/chatgpt_session_log.sgmodule`
- AccessToken 捕获脚本：`https://raw.githubusercontent.com/8310001/surge/main/modules/chatgpt-session/chatgpt_session_log.js`

### 用途

仅在访问下面接口时执行响应脚本：

```text
https://chatgpt.com/api/auth/session
```

捕获成功后发送通知，点击通知并确认后复制 `accessToken` 到剪切板。

### 为什么改成最小影响版

之前的调试版会对 `https://chatgpt.com/` 全站请求挂载请求调试脚本，并且 MITM hostname 包含多个 ChatGPT 相关域名。这样更容易排查，但也更可能影响 ChatGPT 其他请求。

现在已改为：

1. 只 MITM `chatgpt.com`。
2. 移除全站 `http-request` 调试脚本。
3. 只对 `/api/auth/session` 这一个响应启用 `requires-body=true`。
4. `max-size` 从 1MB 降到 256KB。

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
5. 重新打开 ChatGPT，触发 `/api/auth/session`。
6. 看到 `ChatGPT AccessToken 捕获` 通知后，点击通知并确认复制。

注意：即使脚本只挂在 `/api/auth/session`，只要 MITM hostname 包含 `chatgpt.com`，Surge 仍会对 `chatgpt.com` 这个域名进行 HTTPS 解密；如果 ChatGPT 某些请求对 MITM 敏感，仍可能受影响。捕获完成后建议关闭模块或移除 `chatgpt.com` 的 MITM。
