/*
 * Surge 脚本：ChatGPT AccessToken 捕获
 * 用途：命中 https://chatgpt.com/api/auth/session 响应时，通过通知动作复制 accessToken 到剪切板。
 * 安全说明：不会在日志或通知正文显示完整 accessToken。
 * 说明：Surge 的 clipboard 动作需要用户点击通知并确认复制。
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
  if (value.length <= 16) return value.slice(0, 4) + '***';
  return value.slice(0, 8) + '...' + value.slice(-6);
}

const requestUrl = typeof $request !== 'undefined' && $request ? ($request.url || '') : '';
const status = typeof $response !== 'undefined' && $response ? ($response.status || 'unknown') : 'no_response';
const body = typeof $response !== 'undefined' && $response ? ($response.body || '') : '';
const data = safeJsonParse(body || '');

console.log(`[ChatGPT AccessToken] response hit url=${requestUrl} status=${status} body_length=${body.length}`);

let title = 'ChatGPT AccessToken 捕获';
let subtitle = `HTTP ${status}`;
let message = '';
let options = { sound: true };

if (data && data.accessToken) {
  const user = data.user || {};
  const account = user.email || user.name || user.id || 'unknown';
  const expires = data.expires || data.accessTokenExpires || 'unknown';
  const token = String(data.accessToken);

  subtitle = '捕获成功，点通知复制 Token';
  message = [
    `account: ${account}`,
    `expires: ${expires}`,
    `token: ${mask(token)}`,
    `length: ${token.length}`,
    '点击本通知后按确认，即可复制 accessToken 到剪切板。'
  ].join('\n');

  options = {
    action: 'clipboard',
    text: token,
    sound: true
  };

  console.log(`[ChatGPT AccessToken] captured account=${account} expires=${expires} token=${mask(token)} length=${token.length}`);
} else if (data) {
  subtitle = '响应中没有 accessToken';
  message = [
    `url: ${requestUrl}`,
    `status: ${status}`,
    `keys: ${Object.keys(data).join(', ')}`
  ].join('\n');
  console.log(`[ChatGPT AccessToken] no accessToken keys=${Object.keys(data).join(', ')}`);
} else {
  subtitle = 'Session 响应不是有效 JSON 或 body 为空';
  message = [
    `url: ${requestUrl}`,
    `status: ${status}`,
    `body_length: ${body.length}`,
    `body_preview: ${String(body || '').slice(0, 200)}`
  ].join('\n');
  console.log(`[ChatGPT AccessToken] parse failed status=${status} body_length=${body.length}`);
}

$notification.post(title, subtitle, message, options);
$done({});
