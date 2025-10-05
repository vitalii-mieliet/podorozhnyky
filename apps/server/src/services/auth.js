import createHttpError from 'http-errors';
import handlebars from 'handlebars';
import bcrypt from 'bcrypt';
import path from 'node:path';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import {
  getFullNameFromGoogleTokenPayload,
  validateCode,
} from '../utils/googleOAuth2.js';
import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/auth.js';
import { SMTP, TEMPLATES_DIR } from '../constants/index.js';
import { SessionsCollection } from '../db/models/session.js';
import { UserCollection } from '../db/models/user.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { sendEmail } from '../utils/sendEmail.js';

const createSession = () => ({
  accessToken: randomBytes(30).toString('base64'),
  refreshToken: randomBytes(30).toString('base64'),
  accessTokenValidUntil: new Date(Date.now() + accessTokenLifeTime),
  refreshTokenValidUntil: new Date(Date.now() + refreshTokenLifeTime),
});

export const findSession = (query) => SessionsCollection.findOne(query);
export const findUser = (query) => UserCollection.findOne(query);

const jwtSecret = getEnvVar('JWT_SECRET');
const appDomain = getEnvVar('APP_DOMAIN');

export const registerUser = async (data) => {
  const { email, password } = data;

  const user = await UserCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await UserCollection.create({
    ...data,
    password: hashPassword,
  });

  return {
    name: newUser.name,
    email: newUser.email,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const session = createSession();

  return await SessionsCollection.create({
    userId: user._id,
    ...session,
  });
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const oldSession = await findSession({ _id: sessionId, refreshToken });
  if (!oldSession) {
    throw createHttpError(401, 'Session not found');
  }

  if (oldSession.refreshTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Session token expired');
  }

  await SessionsCollection.findByIdAndDelete(oldSession._id);

  const newSession = createSession();

  return await SessionsCollection.create({
    userId: oldSession.userId,
    ...newSession,
  });
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

export const sendResetToken = async (email) => {
  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    jwtSecret,
    {
      expiresIn: '15m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );

  const resetTemplateSource = await readFile(
    resetPasswordTemplatePath,
    'utf-8',
  );

  const template = handlebars.compile(resetTemplateSource);

  const logoCid = 'plantains-app-logo'; // NEW
  const supportEmail = getEnvVar(SMTP.SMTP_FROM); // NEW – можна використати ту ж адресу, що й from
  const year = new Date().getFullYear(); // NEW
  // NEW: шлях до PNG-лого для вкладення (поклади файл сюди)
  // Напр., створити: src/templates/assets/logo.png
  const logoPath = path.join(TEMPLATES_DIR, 'assets', 'plant_logo.png'); // NEW

  const html = template({
    name: user.name,
    resetLink: `${appDomain}/reset/reset-password?token=${resetToken}`,
    // NEW: передаємо додаткові змінні у шаблон
    logoCid, // NEW
    supportEmail, // NEW
    year, // NEW
    appName: 'Подорожники', // NEW (якщо захочеш відмалювати в шаблоні)
  });

  await sendEmail({
    from: getEnvVar(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html,
    // NEW: додаємо логотип як CID-вкладення
    attachments: [
      {
        filename: 'logo.png',
        path: logoPath,
        cid: logoCid, // має збігатися з {{logoCid}} у шаблоні
      },
    ],
  });
};

export const resetPassword = async (payload) => {
  let entries;
  try {
    entries = jwt.verify(payload.token, jwtSecret);
  } catch (error) {
    if (err instanceof Error) throw createHttpError(401, err.message);
    throw err;
  }

  const user = await UserCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await UserCollection.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );
};

export const loginWithGoogleOAuth = async (code) => {
  const loginTicket = await validateCode(code);

  const payload = loginTicket.getPayload();
  if (!payload) throw createHttpError(401, 'Google payload missing');

  let user = await findUser({ email: payload.email });
  if (!user) {
    const name = getFullNameFromGoogleTokenPayload(payload);
    const password = await bcrypt.hash(randomBytes(10).toString('base64'), 10);

    user = await UserCollection.create({
      name,
      email: payload.email,
      password,
    });
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const session = createSession();

  return await SessionsCollection.create({
    userId: user._id,
    ...session,
  });
};
