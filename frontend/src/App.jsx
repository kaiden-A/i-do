import {BrowserRouter , Link , Routes , Route} from 'react-router-dom';
import UserPage from './pages/UserPage/UserPage';
import Dashboard from './pages/UserPage/Dashboard/Dashboard';

function App() {

  return (
    <BrowserRouter>

      <Routes>

          <Route path='/' element={<UserPage/>}>
            <Route path='dashboard' element={<Dashboard/>} />
          </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
