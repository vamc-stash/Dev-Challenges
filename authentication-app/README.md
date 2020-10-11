## Authentication App Challenge
This directory is solution to the [authentication-app](https://devchallenges.io/challenges/N1fvBjQfhlkctmwj1tnw) challenge on https://devchallenges.io/challenges.

### Tech stack used:
  - ExpressJs 
  - ReactJS
  - MongoDB

### Pre-requisite
sensitive information on the [server](https://github.com/vamc-stash/Dev-Challenges/tree/master/authentication-app/server) side is stored in `.env` file at the root directory is not committed here. So, create a file inside [this](https://github.com/vamc-stash/Dev-Challenges/tree/master/authentication-app/server) and map the below variables with the corresponding values.<br>
`NODE_ENV`, `HOST`, `PORT`, `SECURE_HOST`, `SECURE_PORT`, `JWT_SECRET_KEY`, `MONGO_LOCAL_CONN_URL`, `MONGO_DB_NAME`, `FACEBOOK_CLIENT_ID`, `FACEBOOK_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `TWITTER_CLIENT_ID`, `TWITTER_CLIENT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`<br><br>
similarly, on the [client](https://github.com/vamc-stash/Dev-Challenges/tree/master/authentication-app/client) side, varibles holding sensitive values is stored in `constants.js` file inside [this](https://github.com/vamc-stash/Dev-Challenges/tree/master/authentication-app/client/src/shared). Do the same as above with the below varibles <br>
`BASE_URL`, `FACEBOOK_CLIENT_ID`, `FACEBOOK_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `TWITTER_CLIENT_ID`, `TWITTER_CLIENT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` <br><br>
Get the ClientID and ClientSecret keys from the respective social media developer sites.
