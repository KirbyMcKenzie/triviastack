/* eslint-disable @next/next/no-img-element */
// import { createClient } from "@supabase/supabase-js";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div
      style={{
        padding: 12,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ fontSize: 72, fontWeight: 800 }}>triviabot</h1>
      <a
        href="https://slack.com/oauth/v2/authorize?scope=channels%3Ahistory%2Cchat%3Awrite%2Ccommands%2Cim%3Ahistory%2Creactions%3Awrite%2Cchat%3Awrite.public&amp;state=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnN0YWxsT3B0aW9ucyI6eyJzY29wZXMiOlsiY2hhbm5lbHM6aGlzdG9yeSIsImNoYXQ6d3JpdGUiLCJjb21tYW5kcyIsImltOmhpc3RvcnkiLCJyZWFjdGlvbnM6d3JpdGUiLCJjaGF0OndyaXRlLnB1YmxpYyJdfSwibm93IjoiMjAyMy0wMy0wNFQwOTowMzoxNi4zNjRaIiwiaWF0IjoxNjc3OTIwNTk2fQ.gnh6HKeOik5ViNC3aD6BiR4odVUCs_e0vF0bPFz1RdE&amp;client_id=2239800642963.4264761473666"
        // @ts-ignore
        style={{
          alignItems: "center",
          color: "#000",
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: 4,
          display: "inline-flex",
          fontFamily: "font-family:Lato, sans-serif",
          fontSize: "16px",
          paddingLeft: 20,
          paddingRight: 20,
          fontWeight: 600,
          height: 48,
          widows: 236,
          justifyContent: "center",
          textDecoration: "none",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: 20, width: 20, marginRight: 12 }}
          viewBox="0 0 122.8 122.8"
        >
          <path
            d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
            fill="#e01e5a"
          ></path>
          <path
            d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
            fill="#36c5f0"
          ></path>
          <path
            d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
            fill="#2eb67d"
          ></path>
          <path
            d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
            fill="#ecb22e"
          ></path>
        </svg>
        Add to Slack
      </a>
    </div>
  );
};

export default Home;
