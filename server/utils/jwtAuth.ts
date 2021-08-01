import config from '../config';
import jwt from 'jsonwebtoken';

interface IToken {
  id: number; // user pk
}
// access token 발급
const sign = (payload: IToken): string => {
  return jwt.sign(payload, config.jwtSecret, {
    // secret으로 sign하여 발급하고 return
    algorithm: 'HS256', // 암호화 알고리즘
    expiresIn: '1d', // 유효기간
    issuer: 'cashbook18',
  });
};

// refresh token 발급
const refresh = () => {
  return jwt.sign({}, config.jwtSecret, {
    // refresh token은 payload 없이 발급
    algorithm: 'HS256',
    expiresIn: '1d',
  });
};

// access token 검증
const verify = (token: string) => {
  let decoded = null;

  try {
    decoded = jwt.verify(token, config.jwtSecret) as IToken;
    return {
      ok: true,
      id: decoded.id,
      expired: false,
    };
  } catch (err) {
    return {
      ok: false,
      id: 1,
      expired: true,
    };
  }
};

export { sign, refresh, verify };
