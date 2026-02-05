import Layout from './components/layout/Layout.jsx';
import Home from './components/views/Home.jsx';
import Modules from './components/views/Modules.jsx';
import Students from './components/views/Students.jsx';

function App() {
  const loggedInUser = "Zoe";


  return (
    <Layout loggedInUser={loggedInUser}>

      <Home />

      <Modules />

      <Students />

    </Layout>
  );
}

export default App
