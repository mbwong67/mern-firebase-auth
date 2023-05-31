import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fire } from "../fire";
import { User } from "@firebase/auth-types";
import ListAllNumbers from "../components/phonebook/ListAllNumbers";
import ListAllUsers from "../components/phonebook/ListAllUsers";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  fire.auth().onAuthStateChanged((user) => {
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    setLoggedUser(user);
    setIsLoading(false);
    return;
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>Home</h1>
      {!isLoggedIn ? (
        <>
          <div>
            <br />
            <br />
            <Link to="/login">Login</Link>
            <br />
            <br />
            <Link to="/register">Register</Link>
          </div>
        </>
      ) : (
        <>
          {loggedUser && (
            <p>{`You are loggged in, ${loggedUser.displayName}!`}</p>
          )}
          <ListAllNumbers />
          <ListAllUsers />
        </>
      )}
    </div>
  );
};

export default Home;
