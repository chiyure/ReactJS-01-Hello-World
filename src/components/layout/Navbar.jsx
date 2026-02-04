import './Navbar.scss';

function Navbar(){

    return(
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
    );
}

export default Navbar;