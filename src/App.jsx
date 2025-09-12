import Home from './Pages/Home';
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import { ChatProvider } from './contexts/Chat';
import { ContactProvider } from './contexts/Contact';
import { AuthProvider } from './contexts/Auth';

function App() {

    return (
        <>
            <AuthProvider>
                <ContactProvider>
                    <ChatProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Home />} />
                            </Routes>
                        </BrowserRouter>
                    </ChatProvider>
                </ContactProvider>
            </AuthProvider>
        </>
    )
}

export default App
