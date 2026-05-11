/*
 * Surge 脚本：ChatGPT Session 日志捕获
 * 用途：命中 https://chatgpt.com/api/auth/session 响应时，打印概要日志并发送通知。
 * 安全说明：不会保存完整 body，不会复制 accessToken/session token。
 */

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
}

function mask(value) {
  if (!value || typeof value !== 'string') return value;
  if (value.length <= 12) return value.slice(0, 3) + '***';
  return value.slice(0, 6) + '...' + value.slice(-4);
}

const requestUrl = typeof $request !== 'undefined' && $request ? ($request.url || '') : '';
const status = typeof $response !== 'undefined' && $response ? ($response.status || 'unknown') : 'no_response';
const body = typeof $response !== 'undefined' && $response ? ($response.body || '') : '';
const data = safeJsonParse(body || '');

console.log(`[ChatGPT Session] response hit url=${requestUrl} status=${status} body_length=${body.length}`);

let title = 'ChatGPT Session 捕获';
let subtitle = `HTTP ${status}`;
let message = '';

if (data) {
  const user = data.user || {};
  const expires = data.expires || data.accessTokenExpires || '';
  const account = user.email || user.name || user.id || 'unknown';
  const hasAccessToken = Boolean(data.accessToken);
  const hasUser = Boolean(data.user);

  message = [
    `url: ${requestUrl}`,
    `account: ${account}`,
    `user_id: ${mask(user.id || '')}`,
    `expires: ${expires || 'unknown'}`,
    `has_user: ${hasUser}`,
    `has_access_token: ${hasAccessToken}`,
    `keys: ${Object.keys(data).join(', ')}`
  ].join('\n');

  console.log(`[ChatGPT Session] ${message}`);
} else {
  subtitle = 'Session 响应不是有效 JSON 或 body 为空';
  message = [
    `url: ${requestUrl}`,
    `status: ${status}`,
    `body_length: ${body.length}`,
    `body_preview: ${String(body || '').slice(0, 200)}`
  ].join('\n');
  console.log(`[ChatGPT Session] parse failed: ${message}`);
}

$notification.post(title, subtitle, message);
$done({});
