# GiftLink

A full-stack gift-sharing app: React frontend + Node/Express/MongoDB backend with JWT auth.

> Note: this is an independently written reference implementation matching the lab requirements
> (register/login, JWT, gifts list, details page, search page). Use it to learn from and compare
> against your own work rather than submitting it as-is.

## Structure

```
giftlink-app/
├── giftlink-backend/     Express API (auth, gifts, search)
└── giftlink-frontend/    React app (CRA)
```

## Backend setup

```bash
cd giftlink-backend
cp .env.example .env       # then edit .env with your Mongo URL + JWT secret
npm install
node util/import-mongo/import.js   # optional: seed sample gifts
npm start                          # runs on http://localhost:3060
```

Requires a running MongoDB instance (local `mongod`, Docker, or MongoDB Atlas). Set `MONGO_URL`
and `MONGO_DB` in `.env` accordingly, and `JWT_SECRET` to a long random string.

## Frontend setup

```bash
cd giftlink-frontend
cp src/.env.example .env   # or set REACT_APP_BACKEND_URL directly
npm install
npm start                  # runs on http://localhost:3000
```

## API endpoints

- `POST /api/auth/register` — { firstName, lastName, email, password }
- `POST /api/auth/login` — { email, password }
- `PUT  /api/auth/update` — header: `email`, body: { firstName, lastName }
- `GET  /api/gifts` — list all gifts
- `GET  /api/gifts/:id` — gift details
- `POST /api/gifts` — add a gift
- `GET  /api/search?name=&category=&condition=&age_years=` — filtered search

## Pages

- `/` — Landing page
- `/app` — Main page (gift grid, navbar)
- `/register`, `/login` — Auth pages
- `/app/details/:giftId` — Gift details (requires login)
- `/app/search` — Search page with filters
