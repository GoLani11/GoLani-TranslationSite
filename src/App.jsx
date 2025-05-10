import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import LoadingSpinner from './components/common/LoadingSpinner';

// 페이지 컴포넌트 지연 로딩
const HomePage = lazy(() => import('./pages/HomePage/index'));
const TranslationListPage = lazy(() => import('./pages/TranslationListPage/index'));
const TranslationEditorPage = lazy(() => import('./pages/TranslationEditorPage/index'));
const DashboardPage = lazy(() => import('./pages/DashboardPage/index'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="translations" element={<TranslationListPage />} />
          <Route path="translations/:projectId" element={<TranslationListPage />} />
          <Route path="translation-editor/:projectId/:stringId" element={<TranslationEditorPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="projects" element={<Navigate to="/dashboard" replace />} />
          <Route path="projects/:projectId" element={<Navigate to="/translations/:projectId" replace />} />
          <Route path="login" element={<LoginPage />} />
          
          {/* 존재하지 않는 경로는 홈으로 리다이렉트 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
