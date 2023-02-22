import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorPage from './pages/MainPage/ErrorPage';
import MainPage from './pages/MainPage/MainPage'
import './App.css'
import './index.css'
import PlayerRoutes from './routes/Players/PlayerRoutes'
import ClubRoutes from './routes/Clubs/ClubRoutes'
import AdminRoutes from './routes/Admin/AdminRoutes'
import { Provider } from 'react-redux'
import store from './redux-toolkit/store'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
let persistor = persistStore(store);




function App() {
  return (
    <div>
      <>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <BrowserRouter>
              <Routes>
              <Route path="/" element={<MainPage />} />
                <Route path="/player/*" element={<PlayerRoutes />} />
                <Route path="/club/*" element={<ClubRoutes />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </>


    </div>
  )
}

export default App






