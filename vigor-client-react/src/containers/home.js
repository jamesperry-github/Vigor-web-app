import React, { Component, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../actions/actions';

export default function Home() {
  const hist = useHistory();
  const IsLogged = useSelector(state => state.IsLogged);

  useEffect (() => {
    if (!IsLogged) {
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