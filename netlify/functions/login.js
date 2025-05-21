const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const USERS = [
  { username: 'trainer', passwordHash: bcrypt.hashSync('canine123', 10) },
];

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  const { username, password } = JSON.parse(event.body);
  const user = USERS.find(u => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Invalid username or password' }),
    };
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET || 'supersecret123', {
    expiresIn: '2h',
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ token }),
  };
};
