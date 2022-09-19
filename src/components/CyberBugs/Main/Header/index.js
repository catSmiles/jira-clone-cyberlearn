function Header() {
  return (
    <div className="header">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-transparent">
          <li className="breadcrumb-item font-weight-bold">Project</li>
          <li className="breadcrumb-item font-weight-bold">CyberLearn</li>
          <li
            className="breadcrumb-item active font-weight-bold"
            aria-current="page"
          >
            Cyber Board
          </li>
        </ol>
      </nav>
    </div>
  );
}

export default Header;
