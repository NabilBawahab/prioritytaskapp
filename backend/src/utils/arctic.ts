import * as arctic from "arctic";
import "dotenv/config";

const clientId = process.env.GOOGLE_CLIENT_ID as string;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
const redirectURI = process.env.GOOGLE_REDIRECT_URI as string;

export const google = new arctic.Google(clientId, clientSecret, redirectURI);
