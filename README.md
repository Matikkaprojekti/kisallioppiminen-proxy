# kisallioppiminen-backend

Palvelin joka välittää pyyntöjä mockidataan tai oikealle back-endille riippuen ympäristöstä.

### Ohjeet backendin lokaaliin devauskäyttöön:
1. Asenna postgresql ja luo postgresql käyttäjä
2. `git clone git@github.com:Matikkaprojekti/kisallioppiminen-backend.git && cd kisallioppiminen-backend/`
3. Kopioi .env.example -> .env ja täytä kentät
4. `npm install`
5. node_modules/.bin/knex init
6. `npm run watch`

### Tarjolla olevat urlit:

| Metodi(t) | URL                       | Palauttaa:|
| --------| --------------------------- | -------------- | 
| GET     | `/users/me`                 |  autentikoidun käyttäjän. 401 jos ei autentikoitu. |
