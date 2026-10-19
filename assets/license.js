/* 炼 FORGE — 离线会员凭证校验（ECDSA P-256，公钥只做验证） */
(function () {
  const PUBLIC_JWK = {
    kty: 'EC',
    crv: 'P-256',
    x: '_tbO3GUqvFKtnhAcXkcE1YgqInUYLFtkuFck8FDW2M0',
    y: '5cVkMGlj0PzUnxZ57XZId4KUC_ijd7ahqD9XCsQhytg'
  };
  const PREFIX = 'FORGE1';

  function b64urlToBytes(s) {
    const b64 = s.replace(/-/g, '+').replace(/_/g, '/');
    const pad = b64.length % 4 ? '='.repeat(4 - (b64.length % 4)) : '';
    const bin = atob(b64 + pad);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  let keyPromise = null;
  function publicKey() {
    if (!keyPromise) {
      keyPromise = crypto.subtle.importKey(
        'jwk',
        PUBLIC_JWK,
        { name: 'ECDSA', namedCurve: 'P-256' },
        false,
        ['verify']
      );
    }
    return keyPromise;
  }

  function normalize(code) {
    return String(code || '').trim().replace(/\s+/g, '');
  }

  /**
   * 校验激活码，返回 { ok, plan, exp, order, name, reason }
   * 码格式：FORGE1.<base64url(payload)>.<base64url(signature)>
   */
  async function verify(code) {
    const raw = normalize(code);
    const parts = raw.split('.');
    if (parts.length !== 3 || parts[0] !== PREFIX) {
      return { ok: false, reason: '格式不正确，请复制完整的激活码' };
    }
    let payload;
    try {
      payload = JSON.parse(new TextDecoder().decode(b64urlToBytes(parts[1])));
    } catch (e) {
      return { ok: false, reason: '激活码内容无法解析' };
    }
    if (!payload || payload.v !== 1 || !payload.exp) {
      return { ok: false, reason: '激活码版本不受支持' };
    }
    let valid = false;
    try {
      const key = await publicKey();
      valid = await crypto.subtle.verify(
        { name: 'ECDSA', hash: 'SHA-256' },
        key,
        b64urlToBytes(parts[2]),
        new TextEncoder().encode(parts[1])
      );
    } catch (e) {
      return { ok: false, reason: '当前浏览器不支持校验，请更换浏览器重试' };
    }
    if (!valid) return { ok: false, reason: '激活码无效或已被修改' };
    const exp = new Date(payload.exp + 'T23:59:59');
    if (isNaN(exp.getTime())) return { ok: false, reason: '激活码有效期格式错误' };
    if (exp.getTime() < Date.now()) {
      return { ok: false, reason: `会员已于 ${payload.exp} 到期`, plan: payload.plan, exp: payload.exp };
    }
    return {
      ok: true,
      plan: payload.plan === 'coach' ? 'coach' : 'pro',
      exp: payload.exp,
      order: payload.id || '',
      name: payload.name || ''
    };
  }

  function daysLeft(exp) {
    if (!exp) return 0;
    const end = new Date(exp + 'T23:59:59').getTime();
    return Math.max(0, Math.ceil((end - Date.now()) / 86400000));
  }

  window.FORGE_LICENSE = { verify, normalize, daysLeft };
})();
