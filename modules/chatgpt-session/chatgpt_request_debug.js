/*
 * Surge 脚本：ChatGPT 请求命中调试
 * 用途：确认 Surge 模块是否实际命中 chatgpt.com 请求。
 */

const url = ($request && $request.url) || '';
const method = ($request && $request.method) || 'GET';
const headers = ($request && $request.headers) || {};
const ua = headers['User-Agent'] || headers['user-agent'] || '';
const line = `[ChatGPT Request Debug] ${method} ${url} UA=${ua.slice(0, 120)}`;

console.log(line);

if (url.indexOf('/api/auth/session') >= 0) {
  $notification.post('ChatGPT 请求已命中', method, url);
}

$done({});
