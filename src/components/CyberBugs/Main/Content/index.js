import images from '~/assets/images';
function Content() {
  return (
    <div className="container">
      <div className="content row">
        <div className="card col">
          <div className="card-header font-weight-bold">BACKLOG 3</div>
          <ul className="list-group list-group-flush">
            <li
              className="list-group-item cursor-pointer"
              data-toggle="modal"
              data-target="#infoModal"
            >
              <p>
                Each issue has a single reporter but can have multiple assignees
              </p>
              <div className="block d-flex">
                <div className="block-left">
                  <span className="d-inline-block mr-1">
                    <i className="fa fa-bookmark"></i>
                  </span>
                  <span className="d-inline-block">
                    <i className="fa fa-arrow-up"></i>
                  </span>
                </div>
                <div className="block-right">
                  <div className="avatar-group d-flex">
                    <div className="avatar rounded-circle border mr-1">
                      <img src={images.avatar1} alt="" />
                    </div>
                    <div className="avatar rounded-circle border">
                      <img src={images.avatar2} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <p>
                Each issue has a single reporter but can have multiple assignees
              </p>
              <div className="block d-flex">
                <div className="block-left">
                  <span className="d-inline-block mr-1">
                    <i className="fa fa-check-square"></i>
                  </span>
                  <span className="d-inline-block mr-1">
                    <i className="fa fa-arrow-up"></i>
                  </span>
                </div>
                <div className="block-right">
                  <div className="avatar-group d-flex">
                    <div className="avatar rounded-circle border mr-1">
                      <img src={images.avatar1} alt="" />
                    </div>
                    <div className="avatar rounded-circle border">
                      <img src={images.avatar2} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul>
        </div>
        <div className="card col">
          <div className="card-header font-weight-bold">
            SELECTED FOR DEVELOPMENT 2
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Cras justo odio</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
          </ul>
        </div>
        <div className="card col">
          <div className="card-header font-weight-bold">IN PROGRESS 2</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Cras justo odio</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
          </ul>
        </div>
        <div className="card col">
          <div className="card-header font-weight-bold">DONE 3</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Cras justo odio</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Content;
