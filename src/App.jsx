import './App.scss';

function App() {
  const loggedInUser = "Zoe";

  return (
    <div className="layout">

      <header>
        <h1>Basic React Demo</h1>
        <p className="welcome">Welcome {loggedInUser}</p>
      </header>

      <nav>

        <div className="navItem">
          <a to="/">Home</a>
        </div>

        <div className="navItem">
          <a to="/">Modules</a>
        </div>

        <div className="navItem">
          <a to="/">Students</a>
        </div>

      </nav>

      <main>
        <p>Homepage</p>
      </main>

      <footer>
        <p className='thankyou'>Thank you for using this system!</p>
      </footer>

    </div>
  )
}

export default App
