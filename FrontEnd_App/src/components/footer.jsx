export default function Footer() {
  return (
    <footer className="bg-black text-white mt-5 pt-4">
      <div className="container pb-3">
        <div className="row gy-3">
          <div className="col-sm-3 small">
            <div>Directory of City Agencies</div>
            <div>Notify NYC</div>
            <div>NYC Mobile Apps</div>
          </div>
          <div className="col-sm-3 small">
            <div>Contact NYC Government</div>
            <div>CityStore</div>
            <div>Maps</div>
          </div>
          <div className="col-sm-3 small">
            <div>City Employees</div>
            <div>Stay Connected</div>
            <div>Resident Toolkit</div>
          </div>
          <div className="col-sm-3 small">
            <div className="d-flex">
              <img src="/images/smallLogo.png" alt="NYC logo" height="24" className="mb-2 me-2" />
              <form className="d-flex mb-2" role="search">
                <div className="input-group input-group-sm rounded-2 overflow-hidden" style={{ backgroundColor: '#EEEEEE' }}>
                  <input
                    className="form-control border-0"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    style={{ backgroundColor: '#EEEEEE', color: '#000' }}
                  />
                  <button className="btn btn-light border-0" type="submit">
                    <i className="bi bi-search text-dark"></i>
                  </button>
                </div>
              </form>
            </div>
            <div className="small" style={{ color: '#878787' }}>
              City of New York. 2025 All Rights Reserved,<br />
              NYC is a trademark and service mark of the City of New York<br />
              <span className="text-decoration-underline">Privacy Policy</span>. <span className="text-decoration-underline">Terms of Use</span>.
            </div>
          </div>
        </div>
      </div>
    </footer>)
}