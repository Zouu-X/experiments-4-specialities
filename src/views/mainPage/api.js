import * as base64 from 'base-64'
import CryptoJs from 'crypto-js'

export const requestObj = {
  // APPID: '074221c8',
  // APISecret: 'YTExZGE0YTJkNDc4NTBlOTVjZDZkMjg1',
  // APIKey: 'cb152de61bba141c41d10de35605c6cd',
  // Uid: "testAPI",
  // sparkResult: ''

  APPID: 'f15353aa',
  APISecret: 'NDNkMDcwZTAyMjgwOWJmMDcxMjVhNjNh',
  APIKey: '39449273dc620ea9960512c6f18fc8db',
  Uid: "Haruhi",
  sparkResult: ''
}


//鉴权Url构建
export const getWebsocketUrl = () => {
  return new Promise((resovle, reject) => {
    let url = "wss://spark-api.xf-yun.com/v3.1/chat";
    let host = "spark-api.xf-yun.com";
    let apiKeyName = "api_key";
    let date = new Date().toGMTString();
    let algorithm = "hmac-sha256"
    let headers = "host date request-line";
    let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v3.1/chat HTTP/1.1`;
    let signatureSha = CryptoJs.HmacSHA256(signatureOrigin, requestObj.APISecret);
    let signature = CryptoJs.enc.Base64.stringify(signatureSha);

    let authorizationOrigin = `${apiKeyName}="${requestObj.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;

    let authorization = base64.encode(authorizationOrigin);

    // 将空格编码
    url = `${url}?authorization=${authorization}&date=${encodeURI(date)}&host=${host}`;

    resovle(url)
  })
}