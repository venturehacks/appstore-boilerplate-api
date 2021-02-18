const fetch = require("node-fetch");

const getToken = function () {
  return fetch("https://angel.dev/appstore/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: "lW57DHEAaqpCvCZott0rFA",
      user_id: "11d09333-5d13-4881-a011-890a0787f044",
    }),
  })
    .then((res) => res.json()) // expecting a json response
    .then((json) => json.token);
};

const setCount = async function (token, value) {
  await set(token, value, "11d09333-5d13-4881-a011-890a0787f044");
  return fetch("https://angel.dev/appstore/api/set", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: "lW57DHEAaqpCvCZott0rFA",
      user_id: "11d09333-5d13-4881-a011-890a0787f044",
      key: "count",
      value,
      token,
    }),
  })
    .then((res) => res.json()) // expecting a json response
    .then((json) => json.count);
};

const submit = async function (token, value) {
  return fetch("https://angel.dev/appstore/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: "lW57DHEAaqpCvCZott0rFA",
      user_id: "11d09333-5d13-4881-a011-890a0787f044",
      value,
      token,
    }),
  })
    .then((res) => res.json()) // expecting a json response
    .then((json) => json.value);
};

const getCount = function (token) {
  return fetch("https://angel.dev/appstore/api/get", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: "lW57DHEAaqpCvCZott0rFA",
      user_id: "11d09333-5d13-4881-a011-890a0787f044",
      key: "count",
      token,
    }),
  })
    .then((res) => res.json()) // expecting a json response
    .then((json) => json.count);
};

const set = async function (token, value, user_id) {
  const leaderboard = await get(token);
  leaderboard[user_id] = value;

  return fetch("https://angel.dev/appstore/api/set", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: "lW57DHEAaqpCvCZott0rFA",
      user_id: "11d09333-5d13-4881-a011-890a0787f044",
      vendor_level: true,
      key: "leaderboard",
      value: leaderboard,
      token,
    }),
  })
    .then((res) => res.json()) // expecting a json response
    .then((json) => json.leaderboard);
};

const get = function (token) {
  return fetch("https://angel.dev/appstore/api/get", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: "lW57DHEAaqpCvCZott0rFA",
      user_id: "11d09333-5d13-4881-a011-890a0787f044",
      vendor_level: true,
      key: "leaderboard",
      token,
    }),
  })
    .then((res) => res.json()) // expecting a json response
    .then((json) => {
      const leaderboard = json.leaderboard || {};
      const sortedLeaderboard = {};

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

module.exports = { getCount, getToken, setCount, get, submit };
