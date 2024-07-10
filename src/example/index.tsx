import React from 'react';
import { createRoot } from 'react-dom/client';
import Page from './Page';

const root = createRoot(document.getElementById('page'));
root.render(<Page />);
