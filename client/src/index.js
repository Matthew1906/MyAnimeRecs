import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './layout';
import { Anime, Animes, Dashboard, Watchlist } from "./pages";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="" element={<Dashboard />} />
            <Route path='animes/:slug' element={<Anime />}/>
          </Route>
          <Route element={<Layout search={true}/>}>
            <Route path="all" element={<Animes />}/>
            <Route path='watchlist' element={<Watchlist />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
);