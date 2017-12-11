const ZaloSocial = require('zalo-sdk').ZaloSocial;
const dotenv = require("dotenv")
const _ = console.log

dotenv.config()

const {
  APP_ID: appId,
  APP_REDIRECT_URI: redirectUri,
  APP_SECRET: appSecret,
  ZALO_ACCESS_TOKEN: accessToken,
  ZALO_OAUTH_CODE: oauthCode,
} = process.env

const zsConfig = {appId, redirectUri,appSecret,};

const ZSClient = new ZaloSocial(zsConfig);

const waitToken = new Promise(rslv => {
	ZSClient.getAccessTokenByOauthCode(oauthCode, (res) => {
    rslv(res && res.access_token)
	});
})

waitToken.then(accessToken => {
  ZSClient.setAccessToken(accessToken);
  const waitApi = new Promise(rslv => {
    ZSClient.api('me', 'GET', { fields: 'id, name, birthday, gender, picture' }, (res) => {
      rslv(res);
    });
  })

  waitApi.then(res => _(res))
})