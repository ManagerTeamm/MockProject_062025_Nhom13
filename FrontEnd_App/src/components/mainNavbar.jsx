export default function MainNavbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white">
      <div className="container d-flex flex-column align-items-center justify-content-between">
        <div className="logo-container border-bottom d-flex align-items-center justify-content-center mb-3 w-100">
          <a className="navbar-brand" href="#">
            <img src="/images/bigLogo.png" width="256" height="100" alt="NYPD Logo" />
          </a>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav mb-2 mb-lg-0">
            {['Home','About','Bureaus','Services','Stats','Policies'].map((item, idx) => (
              <li key={idx} className={`nav-item${idx>0 ? ' border-start ps-3 ms-3' : ''}`}>
                <a className={`nav-link${idx===0 ? ' active' : ''}`} href="#">{item}</a>
              </li>
            ))}
          </ul>
          <form className="d-flex border rounded-2 mt-2 mt-lg-0" role="search" style={{ backgroundColor: '#EEEEEE' }}>
            <div className="input-group input-group-sm">
              <span className="input-group-text border-0" style={{ backgroundColor: '#EEEEEE', color: '#878787' }}>
                <i className="bi bi-search"></i>
              </span>
              <input
                className="form-control border-0"
                placeholder="Search"
                style={{ backgroundColor: '#EEEEEE', color: '#878787' }}
              />
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}
