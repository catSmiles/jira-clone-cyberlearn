import images from '~/assets/images';
function Info() {
  return (
    <>
      <div className="info d-flex align-items-center">
        <div className="search-block">
          {/* <input className="search" placeholder="search" /> */}
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            aria-label="search"
          />
          {/* <i className="fa fa-search"></i> */}
        </div>
        <div className="avatar-group d-flex">
          <div className="avatar border rounded-circle">
            <img src={images.avatar1} alt="" />
          </div>
          <div className="avatar border rounded-circle mx-2">
            <img src={images.avatar2} alt="" />
          </div>
          <div className="avatar border rounded-circle">
            <img src={images.avatar3} alt="" />
          </div>
        </div>
        <div className="text ml-3">Only My Issues</div>
        <div className="text ml-3">Recently Updated</div>
      </div>
    </>
  );
}

export default Info;
