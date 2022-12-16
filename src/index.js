import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App.js";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { Query } from "@apollo/client/react/components/Query";
import { gql } from "@apollo/client";
import Loader from "./components/Loader";
//Setting up Appolo client for graphQL
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

//Geting an arrays of all categories and all currencies for Header->Navigation and Header->Actions->Currencies
const GET_CATEGORIES_AND_CURRENCIES = gql`
  query GetCategoriesNameAndCurrenciesSymbol {
    categories {
      name
    }
    currencies {
      symbol
      label
    }
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Query query={GET_CATEGORIES_AND_CURRENCIES}>
        {function ({ loading, data, error }) {
          if (loading) return <Loader />;
          if (error) {
            console.error("GraphQL connection error in index.js " + error);
            return <p>Connection error</p>;
          }
          return (
            <App categories={data.categories} currencies={data.currencies} />
          );
        }}
      </Query>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
