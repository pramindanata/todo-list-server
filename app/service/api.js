const composeJson = (success, messages = null, data = null, error = null) => {
  const json = {};

  json.status = success ? 'OK' : 'FAILED';

  if (messages) {
    if (typeof messages === 'string') {
      json.messages = [messages];
    } else if (typeof messages === 'object' && messages.length > 0) {
      json.messages = [...messages];
    }
  }

  if (data !== null) {
    json.data = data;
  }

  if (error) {
    json.error = error;
  }

  return json;
};

const sendJson = (res, success, messages = null, data = null, error = null) => {
  const json = composeJson(success, messages, data, error);

  return res.json(json);
};

const sendJsonWithCode = (res, code, success, messages = null, data = null, error = null) => {
  const json = composeJson(success, messages, data, error);

  return res.status(code)
    .json(json);
};

module.exports = {
  sendJson,
  sendJsonWithCode,
};
