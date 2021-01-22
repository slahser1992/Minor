import * as constant from '@config/constant.json';

class Config {
  static _env = process.env.NODE_ENV;
  static _port = constant.port;
  static _db_address = constant.db_address;
  static _secret = constant.secret;
}

export default Config;