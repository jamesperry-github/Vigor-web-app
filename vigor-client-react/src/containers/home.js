import React, { Component, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { checkLogin } from '../config/session';
import { useSelector } from 'react-redux';

export default function Home() {
  const hist = useHistory();
  const isLogged = useSelector(state => state.isLogged);
  console.log("ISLOGGED", isLogged);

  useEffect (() => {
    if (!checkLogin()) {
      hist.push("/login");
    }
  })

  const cardContent = () => {
    return (
      <div>
        <div className="card-header">
          <h5 className="card-title">Home Page</h5>
        </div>
        <div className="card-body">
          TODO: DASHBOARD
        </div>
      </div>
    )
  };

  return (
    <div className="home container">
      <div className="home full-card">
        <div className="home card">
          {cardContent()}
        </div>
      </div>
    </div>
  );
};