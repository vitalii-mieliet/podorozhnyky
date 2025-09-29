import { OAuth2Client } from 'google-auth-library';
import createHttpError from 'http-errors';
import { getEnvVar } from './getEnvVar.js';

const redirectUri = getEnvVar('GOOGLE_OAUTH_REDIRECT');
const clientId = getEnvVar('GOOGLE_OAUTH_CLIENT_ID');
const clientSecret = getEnvVar('GOOGLE_OAUTH_CLIENT_SECRET');

const googleOAuthClient = new OAuth2Client({
  redirectUri,
  clientId,
  clientSecret,
});

export const generateOAuthUrl = () =>
  googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });

export const validateCode = async (code) => {
  const response = await googleOAuthClient.getToken(code);
  if (!response.tokens.id_token) throw createHttpError(401, 'Unauthorized');

  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });
  return ticket;
};

export const getFullNameFromGoogleTokenPayload = ({
  name,
  given_name,
  family_name,
}) => {
  let fullName = 'Guest';

  if (name) {
    fullName = name;
  } else if (given_name && family_name) {
    fullName = `${given_name} ${family_name}`;
  } else if (given_name) {
    fullName = given_name;
  }
  return fullName;
};
