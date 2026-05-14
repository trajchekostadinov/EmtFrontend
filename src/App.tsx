import './App.css';
import BooksPage from './ui/pages/BooksPage/BooksPage.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './ui/components/layout/Layout/Layout.tsx';
import HomePage from './ui/pages/HomePage/HomePage.tsx';
import BooksDetailsPage from './ui/pages/BooksDetailsPage/BooksDetailsPage.tsx';
import AuthorsPage from './ui/pages/AuthorsPage/AuthorsPage.tsx';
import CountriesPage from './ui/pages/CountriesPage/CountriesPage.tsx';
import AuthorDetailsPage from './ui/pages/AuthorDetailsPage/AuthorDetailsPage.tsx';
import CountryDetailsPage from './ui/pages/CountryDetailsPage/CountryDetailsPage.tsx';
import LoginPage from './ui/pages/LoginPage/LoginPage.tsx';
import RegisterPage from './ui/pages/RegisterPage/RegisterPage.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import ProtectedRoute from './ui/components/ProtectedRoute/ProtectedRoute.tsx';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/*//public routes*/}
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/' element={<Layout />}>
                        <Route index element={<HomePage />} />


                        {/*//Treba da si najaven:*/}
                        <Route path='books' element={
                            <ProtectedRoute><BooksPage /></ProtectedRoute>
                        } />
                        <Route path='books/:id' element={
                            <ProtectedRoute><BooksDetailsPage /></ProtectedRoute>
                        } />
                        <Route path='authors' element={
                            <ProtectedRoute><AuthorsPage /></ProtectedRoute>
                        } />
                        <Route path='authors/:id' element={
                            <ProtectedRoute><AuthorDetailsPage /></ProtectedRoute>
                        } />
                        <Route path='countries' element={
                            <ProtectedRoute><CountriesPage /></ProtectedRoute>
                        } />
                        <Route path='countries/:id' element={
                            <ProtectedRoute><CountryDetailsPage /></ProtectedRoute>
                        } />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>

    );
}

export default App;