# kisallioppiminen-backend

Palvelin joka välittää pyyntöjä mockidataan tai oikealle back-endille riippuen ympäristöstä.

### Ohjeet backendin lokaaliin devauskäyttöön:
1. `git clone git@github.com:Matikkaprojekti/kisallioppiminen-backend.git && cd kisallioppiminen-backend/ && npm install && npm run watch`
2. Mene [tänne](https://ohtukisalli.github.io/) ja kirjaudu sisään.
2. Mene [tänne](https://pure-inlet-98383.herokuapp.com/) ja ja avaa devtoolsista Application/Cookies
5. Kopio _name_ ja _value_ kenttien sisällöt ja pastea ne [tänne](http://localhost:8080)
6. Testaa lokaalin backendin toimivuus menemällä [tänne](http://localhost:8080/user)

### Tarjolla olevat urlit:

| Metodi(t) | URL                       | Palauttaa:|
| --------| --------------------------- | -------------- | 
| GET     | `/users/me`                 |  autentikoidun käyttäjän. 401 jos ei autentikoitu. |
