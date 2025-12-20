import {BrowserRouter , Link , Routes , Route} from 'react-router-dom';
import UserPage from './pages/UserPage/UserPage';
import Dashboard from './pages/UserPage/Dashboard/Dashboard';
import SignPage from './pages/SignPage/SignPage';
import ToDo from './pages/UserPage/ToDoDashboard/ToDo';
import Notes from './pages/NoteSection/Notes';
import DragSnap from './DragSnap';
import { TaskProvider } from './pages/Context/TaskContext';

function App() {

  return (
    <BrowserRouter>

      <Routes>

          <Route path='/login' element={<SignPage login={true}/>}/>
          <Route path='/signup' element={<SignPage login={false}/>}/>


          <Route path='/' element={<UserPage/>}>
            <Route path='dashboard' element={<Dashboard/>} />
            <Route path='studies' element={
              <TaskProvider>
                <ToDo/>
              </TaskProvider>
            } />
            <Route path='notes' element={<Notes/>} />
          </Route>

          <Route path='/test' element={<DragSnap/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
