export interface TokenList {
  exp: number;
  sub: string;
  nick: string;
}

export interface ErrorResponse {
  errorCode: string;
  httpStatu: string;
  msg: string;
}
