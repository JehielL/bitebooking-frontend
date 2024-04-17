
/*
{
  "sub": "1",
  "iat": 1712244930,
  "exp": 1712849730,
  "role": "admin",
  "email": "user1@gmail.com"
}
*/
export interface DecodedToken {
  sub: string;
  iat: number;
  exp: number;
  role: string;
  email: string;
}
