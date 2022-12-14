import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import MovieProvider from "./MovieContext";
import { Auth0Provider } from "@auth0/auth0-react";
import { FavoritesProvider } from "./FavoritesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-kpg4kxei.us.auth0.com"
    clientId="P6rBLr2OjE4GWWK83cq9UUosUkqnwTEb"
    redirectUri={window.location.origin}
  >
    <MovieProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </MovieProvider>
  </Auth0Provider>
);
