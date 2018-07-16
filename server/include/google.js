const {
    OAuth2Client
} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID, 
    });
    const payload = ticket.getPayload();
    return {
        name:payload.name,
        email:payload.email,
        img:payload.picture,
        google:true
    }
}

module.exports = {verify}