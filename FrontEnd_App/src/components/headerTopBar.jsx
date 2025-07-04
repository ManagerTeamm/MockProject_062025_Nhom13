export default function HeaderTopBar() {
  return (
    <div className="bg-dark text-white small px-3 py-1 d-flex justify-content-between align-items-center" style={{ fontSize: 12 }}>
      <span>
        <img src="/images/helpIsAvailable.png" alt="NYC" height="15" style={{ marginRight: 8 }} />
        New York City Police Department
      </span>
      <span>
        <div className="dropdown">
          <button
            className="btn btn-sm dropdown-toggle border-0 text-white"
            type="button"
            id="languageDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ fontSize: '0.85rem' }}
          >
            English
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
            <li><a className="dropdown-item small" href="#">Tiếng Việt</a></li>
            <li><a className="dropdown-item small" href="#">日本語</a></li>
            <li><a className="dropdown-item small" href="#">Français</a></li>
          </ul>
        </div>
      </span>
    </div>
  );
}