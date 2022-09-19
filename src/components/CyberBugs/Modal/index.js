import images from '~/assets/images';
function ModalCyberBugs(props) {
  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              <i className="fa fa-bookmark"></i>
              <span className="font-weight-bold">TASK-217871</span>
            </div>
            <div className="task-click d-flex">
              <div>
                <i className="fab fa-telegram-plane"></i>
                <span className="pl-1">Give feedback</span>
              </div>
              <div className="mx-3">
                <i className="fa fa-link"></i>
                <span className="pl-1">Copy link</span>
              </div>
              {/* <div>
                <i className="fa fa-trash-alt cursor-pointer"></i>
              </div> */}
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">This is an issue of type: Task</p>
                  <div className="description">
                    <p>Description</p>
                    <p className="">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Esse expedita quis vero tempora error sed reprehenderit
                      sequi laborum, repellendus quod laudantium tenetur nobis
                      modi reiciendis sint architecto. Autem libero quibusdam
                      odit assumenda fugiat? Beatae aliquid labore vitae
                      obcaecati sapiente asperiores quia amet id aut, natus quo
                      molestiae quod voluptas, temporibus iusto laudantium sit
                      tempora sequi. Rem, itaque id, fugit magnam asperiores
                      voluptas consectetur aliquid vel error illum, delectus eum
                      eveniet laudantium at repudiandae!
                    </p>
                  </div>
                  <div className="font-weight-bold mb-2">
                    Jira Software (software projects) issue types:
                  </div>
                  <div className="title">
                    <div className="title-item">
                      <h5>
                        <i className="fa fa-bug"></i>
                        <span className="d-inline-block ml-2">BUG</span>
                      </h5>
                      <p>
                        A bug is a problem which impairs or prevents the
                        function of a product.
                      </p>
                    </div>
                    <div className="title-item">
                      <h5>
                        <i className="fa fa-book-reader"></i>
                        <span className="d-inline-block ml-2">STORY</span>
                      </h5>
                      <p>
                        A user story is the smallest unit of work that needs to
                        be done.
                      </p>
                    </div>
                    <div className="title-item">
                      <h5>
                        <i className="fa fa-tasks"></i>
                        <span className="d-inline-block ml-2">TASK</span>
                      </h5>
                      <p>A task represents work that needs to be done</p>
                    </div>
                  </div>
                  <div className="comment">
                    <h6>Comment</h6>
                    <div className="block-comment d-flex align-items-start">
                      <div className="avatar rounded-circle border">
                        <img src={images.avatar1} alt="avatar" />
                      </div>
                      <div className="input-comment">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Add a comment..."
                        />
                        <p>
                          {/* <span style="font-weight: 500; color: gray;"> */}
                          <span className="font-weight-bold text-secondary pr-1">
                            Tip:
                          </span>
                          <span>
                            press
                            <span
                              className="font-weight-bold d-inline-block px-2 m-2 text-secondary"
                              style={{
                                backgroundColor: '#ecedf0',
                                color: '#b4bac6',
                              }}
                            >
                              M
                            </span>
                            to comment.
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="lastest-comment">
                      <div className="comment-item">
                        <div className="display-comment d-flex align-items-start">
                          <div className="avatar rounded-circle border">
                            <img src={images.avatar1} alt="" />
                          </div>
                          <div>
                            <p className="mb-2">
                              <span className="pr-2 font-weight-bold">
                                Lord Gaben
                              </span>
                              <span className="text-secondary">
                                a month ago
                              </span>
                            </p>
                            <p className="mb-2">
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Repellendus tempora ex
                              voluptatum saepe ab officiis alias totam ad
                              accusamus molestiae?
                            </p>
                            <div>
                              <span
                                className="mr-2 p-1 cursor-pointer border d-inline-block"
                                style={{ color: '#929398' }}
                              >
                                Edit
                              </span>
                              <span
                                className="p-1 border cursor-pointer d-inline-block"
                                style={{ color: '#929398' }}
                              >
                                Delete
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6 className="font-weight-bold">STATUS</h6>

                    {/* Select - options */}
                    <div className="input-group">
                      <select className="custom-select" id="inputGroupSelect04">
                        <option defaultValue="0">Selected for developer</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    {/* end select */}
                  </div>
                  <div className="assignees">
                    <h6 className="font-weight-bold">ASSIGNEES</h6>
                    <div className="d-flex">
                      <div className="d-flex item align-items-center">
                        <div className="avatar mr-1">
                          <img src={images.avatar1} alt="" />
                        </div>
                        <p className="name">
                          Pickle Rick
                          <span className="d-inline-block pl-2 cursor-pointer">
                            <i className="fa fa-times"></i>
                          </span>
                        </p>
                      </div>
                      {/* <div style="display: flex; align-items: center;"> */}
                      <div className="d-flex align-items-center cursor-pointer">
                        <span className="d-inline-block mr-2">
                          <i className="fa fa-plus"></i>
                        </span>
                        <span>Add more</span>
                      </div>
                    </div>
                  </div>
                  <div className="reporter">
                    <h6 className="font-weight-bold mt-3 mb-2">REPORTER</h6>
                    <div className="d-flex item align-items-center">
                      <div className="avatar mr-1">
                        <img src={images.avatar1} alt="" />
                      </div>
                      <p className="name">
                        Pickle Rick
                        <span className="d-inline-block pl-2 cursor-pointer">
                          <i className="fa fa-times"></i>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    className="priority"
                    // style="margin-bottom: 20px;"
                  >
                    <h6 className="font-weight-bold mt-3 mb-2">PRIORITY</h6>
                    <select className="custom-select">
                      <option value="1">Highest</option>
                      <option value="2">Medium</option>
                      <option value="3">Low</option>
                      <option value="4">Lowest</option>
                    </select>
                  </div>
                  <div className="estimate">
                    <h6 className="font-weight-bold mt-3 mb-2">
                      ORIGINAL ESTIMATE (HOURS)
                    </h6>
                    <input
                      type="text"
                      className="estimate-hours form-control"
                    />
                  </div>
                  <div className="time-tracking">
                    <h6 className="font-weight-bold mt-3 mb-2">
                      TIME TRACKING
                    </h6>
                    <div className="d-flex">
                      <div>
                        <i className="fa fa-clock"></i>
                      </div>
                      <div className="w-full">
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: '25%' }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                          <p className="logged">4h logged</p>
                          <p className="estimate-time">12h estimated</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div style="color: #929398;"> */}
                  <div>Create at a month ago</div>
                  {/* <div style="color: #929398;"> */}
                  <div>Update at a few seconds ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCyberBugs;
