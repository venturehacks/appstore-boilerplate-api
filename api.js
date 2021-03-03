//Include fetch package so we can make node-side requests.
const fetch = require("node-fetch");
const apiKey = "lW57DHEAaqpCvCZott0rFA";

const apiHost = "https://angel.co";
// const apiHost = 'https://angel.dev';
// user_id = "11d09333-5d13-4881-a011-890a0787f044"

//Auth our user and get a token in these examples we will use a predefined user_id and API key.
//You should use yours as these will not work.

const getToken = function (uid) {
  return fetch(`${apiHost}/appstore/api/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      user_id: uid,
    }),
  })
    .then((res) => res.json()) // expecting a json response
    .then((json) => json.token);
};

const setCount = async function (token, value, uid) {
  await set(token, value, uid);
  return fetch(`${apiHost}/appstore/api/set`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      user_id: uid,
      key: "count",
      value,
      token,
    }),
  })
    .then((res) => res.json()) // expecting a json response
    .then((json) => json.count);
};

const submit = async function (token, value, uid) {
  return fetch(`${apiHost}/appstore/api/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      user_id: uid,
      value,
      token,
    }),
  })
    .then((res) => res.json()) // expecting a json response
    .then((json) => json.value);
};

const getCount = function (token, uid) {
  return fetch(`${apiHost}/appstore/api/get`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      user_id: uid,
      key: "count",
      token,
    }),
  })
    .then((res) => res.json()) // expecting a json response
    .then((json) => json.count);
};

//Warning, there could be a race condition here.  We get and then update the value of the leaderboard as a blob.
//It's up to the developer to avoid these conditions for the vendor level storage.
const set = async function (token, value, uid) {
  const leaderboard = await get(token, uid);
  leaderboard[uid] = value;

  return fetch(`${apiHost}/appstore/api/set`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      user_id: uid,
      vendor_level: true,
      key: "leaderboard",
      value: leaderboard,
      token,
    }),
  })
    .then((res) => res.json()) // expecting a json response
    .then((json) => json.leaderboard);
};

const get = function (token, uid) {
  return fetch(`${apiHost}/appstore/api/get`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      user_id: uid,
      vendor_level: true,
      key: "leaderboard",
      token,
    }),
  })
    .then((res) => res.json()) // expecting a json response
    .then((json) => {
      const leaderboard = json.leaderboard || {};
      const sortedLeaderboard = {};

      //Here we sort the leaderboard hash by score values.
      var keys = Object.keys(leaderboard);
      keys
        .sort(function (a, b) {
          return leaderboard[a] - leaderboard[b];
        })
        .reverse()
        .forEach(function (k) {
          sortedLeaderboard[k] = leaderboard[k];
        });

      return sortedLeaderboard;
    });
};

//Export these functions...
module.exports = { getCount, getToken, setCount, get, submit };
