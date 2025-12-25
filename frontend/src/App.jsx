import {BrowserRouter , Routes , Route} from 'react-router-dom';
import UserPage from './pages/UserPage/UserPage';
import Dashboard from './pages/UserPage/Dashboard/Dashboard';
import SignPage from './pages/SignPage/SignPage';
import ToDo from './pages/UserPage/ToDoDashboard/ToDo';
import Notes from './pages/NoteSection/Notes';
import { TaskProvider } from './pages/Context/TaskContext';
import { DashboardProvider } from './pages/Context/DashboardContext';
import { NotesProvider } from './pages/Context/NotesContext';
import JoinGroup from './pages/JoinGroup/JoinGroup';

function App() {

  return (
    <BrowserRouter>

      <Routes>

          <Route path='/login' element={<SignPage login={true}/>}/>
          <Route path='/signup' element={<SignPage login={false}/>}/>

          <Route path='/join/:groupId/:tokenId' element={<JoinGroup/>}/>

          <Route path='/' element={<UserPage/>}>
            <Route path='dashboard' element={
              <DashboardProvider>
                <Dashboard/>
              </DashboardProvider>
            } />
            <Route path='studies' element={
              <TaskProvider>
                <ToDo/>
              </TaskProvider>
            } />
            <Route path='notes' element={
              <NotesProvider>
                <Notes/>
              </NotesProvider>
            } />
          </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
