import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { MaterialsComputation } from './features/computation/MaterialsComputation';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/computation\" replace />} />
          <Route path="/computation" element={<MaterialsComputation />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;