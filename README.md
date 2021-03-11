## **AngelList Appstore API**

Welcome, you have been chosen to create an application for the AngelList Appstore. This API allows us to login, get and set data via the AngelList keystore, as well as send us a final "result". A result is usually something like the score on an assessment, or other structured data that we need from you.

## **Authenticate With Us**

- **URL**

  /auth

- **Method:**

  `POST` | `DELETE`

- **Data Params**

  ```JSON
    {
      api_key: "<API_KEY>",
      app_slug: "<String>"
      user_id: "<UUID>",
    }
  ```

- **Success Response:**

  - **Code:** 200
  **Content:**
  ```JSON
      {
          token: <TOKEN>,
          user: {
              first_name: "John",
              last_name: "Smith",
              email: "john@example.com"
          }
      }
  ```
  Note: the "user" property will contain whichever fields your apps have permission to read

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED
    **Content:** `{ error: "true", "message" : "Unauthed" }`

  OR

  - **Code:** 422 UNPROCESSABLE ENTRY
    **Content:** `{ error: "true", "message" : "unprocessable" }`

- **Sample Call:**

  ```JAVASCRIPT
  await fetch('https://angel.co/appstore/api/auth', {
    method: 'POST',
    body: {
      api_key: "<API_KEY>",
      app_slug: "my_app",
      user_id: "<UUID>",
    }
  });
  ```

* **Notes:**

  You will need to use the returned token to authenticate with all other API calls. This will expire after 24 hours, you will need to call this again if the token expires.

## **Get Data**

- **URL**

  /get

- **Method:**

  `POST`

- **Data Params**

  ```JSON
    {
      token: "<TOKEN>",
      key: "my_key"
    }
  ```

- **Success Response:**

  - **Code:** 200
    **Content:** `{ key : 'my_key', my_key: 'some_previously_saved_value' }`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED
    **Content:** `{ error: "true", "message" : "Unauthed" }`

  OR

  - **Code:** 422 UNPROCESSABLE ENTRY
    **Content:** `{ error: "true", "message" : "unprocessable" }`

- **Sample Call:**

  ```JAVASCRIPT
  await fetch('https://angel.co/appstore/api/get', {
    method: 'POST',
    body: {
      token: "<TOKEN>",
      key: "my_key",
    }
  });
  ```

* **Notes:**

  If you have not saved to this key before it'll just return null.

## **Set Data**

- **URL**

  /set

- **Method:**

  `POST`

- **Data Params**

  ```JSON
    {
      token: "<TOKEN>",
      key: "my_key",
      value: "my_value"
    }
  ```

- **Success Response:**

  - **Code:** 200
    **Content:** `{ key : 'my_key', my_key: 'my_value', success: "true" }`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED
    **Content:** `{ error: "true", "message" : "Unauthed" }`

  OR

  - **Code:** 422 UNPROCESSABLE ENTRY
    **Content:** `{ error: "true", "message" : "unprocessable" }`

- **Sample Call:**

  ```JAVASCRIPT
  await fetch('https://angel.co/appstore/api/set', {
    method: 'POST',
    body: {
      token: "<TOKEN>",
      key: "my_key",
      value: "my_value",
    }
  });
  ```

* **Notes:**

  If you have not saved to this key before it'll just return null.
