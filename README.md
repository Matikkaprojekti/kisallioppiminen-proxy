# kisallioppiminen-proxy

Palvelin joka välittää pyyntöjä mockidataan tai "oikealle"(eli useinmiten lokaalille) back-endille riippuen ympäristömuuttujista.

### Ohjeet proxyn lokaaliin devauskäyttöön:
1. `git clone git@github.com:Matikkaprojekti/kisallioppiminen-proxy.git && cd kisallioppiminen-proxy/ && npm install`
2. `cp .env.example .env` ja täytä kentät esim mockidatalle:
NODE_ENV=test
STAGING_BACKEND_ENTRYPOINT=
DEV_BACKEND_ENTRYPOINT=http://localhost:8000
PROD_BACKEND_ENTRYPOINT=
DEV_CORS_ORIGIN=http://localhost:3000
TEST_CORS_ORIGIN=http://localhost:3000
STAGING_CORS_ORIGIN=
PROD_CORS_ORIGIN=
Jos haluat käyttää lokaalia backendiä niin vaihda NODE_ENV=dev
3. `npm run watch`
4 a. (MOCK DATA ELI NODE_ENV=test) Testaa toimivuus menemällä http://localhost:8080/users/me , jonka pitäisi palauttaa unauthorized. Kun käynnistät frontendin, surffaat lokaaliin frontendiin(esimerkiksi http://localhost:3000 , niin "Jorman" pitäisi kirjautua automaatisesti(MOCK DATALLA) ja http://localhost:8080/users/me pitäisi palauttaa { user_id: 420, name: "Jorma" }.
4 b. (LOKAALI BACKEND ELI NODE_ENV=dev) Kirjautuminen vaatii google tunnuksen, ja kirjautuminen pitää suorittaa frontendin kautta. Huomaa myös että backendin pitää olla käynnissä, joko lokaalisti tai herokussa ja DEV_BACKEND_ENTRYPOINT sen mukainen! Ohjeet lokaalin backendin
asennukseen löydät osoitteesta https://github.com/Matikkaprojekti/kisallioppiminen-backend
5. Eli kokonaisvaltaiseen end-to-end devaukseen pitää olla käynnissä yhtä aikaa frontend, proxy ja end! 


### Tarjolla olevat urlit:

| Metodi(t) | URL                       | Palauttaa:|
| --------| --------------------------- | -------------- | 
| GET     | `/users/me`                 |  autentikoidun käyttäjän. 401 jos ei autentikoitu. |
