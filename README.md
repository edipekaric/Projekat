# Password Checker

Repo: https://github.com/edipekaric/Projekat

## Hostanje (GitHub)

| Dio | Gdje | URL |
|-----|------|-----|
| Frontend | GitHub Pages | https://edipekaric.github.io/Projekat/ |
| Backend | Render (besplatno) | tvoj `*.onrender.com` URL |

**1. GitHub Pages (FE)**  
Repo → Settings → Pages → Source: **GitHub Actions**. Push na `main` pokreće deploy.

**2. Backend (Render)**  
[render.com](https://render.com) → New → Blueprint → poveži repo → `render.yaml`.  
Kopiraj URL servisa (npr. `https://password-checker-api.onrender.com`).

**3. Poveži FE i BE**  
Repo → Settings → Secrets and variables → Actions → Variables →  
`VITE_API_BASE` = URL backenda **bez** `/api/password` (samo origin, npr. `https://password-checker-api.onrender.com`).  
Ponovo pokreni workflow (Actions → Deploy frontend → Run workflow).

Lokalno radi bez varijable (default `localhost:8088`).

## Railway FE

- Root: `frontend`
- Build: `npm run build` (generiše `dist/env.js` iz `VITE_API_BASE`)
- Start: `npm run start`
- Variable: `VITE_API_BASE` = BE URL (npr. `https://projekat-production-5451.up.railway.app`)

## Backend
```bash
cd backend
./mvnw spring-boot:run
```
→ http://localhost:8088

## Frontend
```bash
cd frontend
npm install
npm run dev
```
→ http://localhost:5173
