import Home from './Pages/Home';
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import { ChatProvider } from './contexts/Chat';
import { ContactProvider } from './contexts/Contact';
import { AuthProvider } from './contexts/Auth';
import { LoaderProvider } from './contexts/Loader';
import { ShowPopupProvider } from './contexts/ShowPopup';
import { StateProvider } from './contexts/State';

function App() {

    return (
        <>
            <LoaderProvider>
                <AuthProvider>
                    <ContactProvider>
                        <ChatProvider>
                            <StateProvider>
                                <ShowPopupProvider>
                                    <BrowserRouter>
                                        <Routes>
                                            <Route path="/" element={<Home />} />
                                        </Routes>
                                    </BrowserRouter>
                                </ShowPopupProvider>
                            </StateProvider>
                        </ChatProvider>
                    </ContactProvider>
                </AuthProvider>
            </LoaderProvider>
        </>
    )
}

export default App
