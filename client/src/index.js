import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './layout';
import { Anime, Animes, Dashboard, Watchlist } from "./pages";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="animes" element={<Animes />}/>
            <Route path='watchlist' element={<Watchlist />}/>
            <Route path=':slug' element={<Anime />}/>
          </Route>
        </Routes>
      </BrowserRouter>
);