import { SessionsCollection } from '../db/models/session.js';

export const logoutUser = (sessionId) => {
  SessionsCollection.findOneAndDelete({ _id: sessionId });
};
