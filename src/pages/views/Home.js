import React from 'react'
import MainLayoutAuth from '../../layouts/MainLayoutAuth'

const Home = () => {
  return (
    <div>
        <div className="page-heading">
    <h3>Our Statistics</h3>
</div>
<div className="page-content">
    <section className="row">
        <div className="col-12 col-lg-9">
            <div className="row">
                <div className="col-6 col-lg-3 col-md-6">
                    <div className="card">
                        <div className="card-body px-4 py-4-5">
                            <div className="row">
                                <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                    <div className="stats-icon purple mb-2">
                                        <i className="iconly-boldShow"></i>
                                    </div>
                                </div>
                                <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                    <h6 className="text-muted font-semibold">Total Students</h6>
                                    <h6 className="font-extrabold mb-0">112000</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-lg-3 col-md-6">
                    <div className="card">
                        <div className="card-body px-4 py-4-5">
                            <div className="row">
                                <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                    <div className="stats-icon blue mb-2">
                                        <i className="iconly-boldProfile"></i>
                                    </div>
                                </div>
                                <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                    <h6 className="text-muted font-semibold">Boys</h6>
                                    <h6 className="font-extrabold mb-0">183000</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-lg-3 col-md-6">
                    <div className="card">
                        <div className="card-body px-4 py-4-5">
                            <div className="row">
                                <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                    <div className="stats-icon green mb-2">
                                        <i className="iconly-boldAdd-User"></i>
                                    </div>
                                </div>
                                <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                    <h6 className="text-muted font-semibold">Girls</h6>
                                    <h6 className="font-extrabold mb-0">80000</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-lg-3 col-md-6">
                    <div className="card">
                        <div className="card-body px-4 py-4-5">
                            <div className="row">
                                <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                    <div className="stats-icon red mb-2">
                                        <i className="iconly-boldBookmark"></i>
                                    </div>
                                </div>
                                <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                    <h6 className="text-muted font-semibold">Comments</h6>
                                    <h6 className="font-extrabold mb-0">112</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Attendace Stats</h4>
                        </div>
                        <div className="card-body">
                            <div id="chart-profile-visit"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-xl-4">
                    <div className="card">
                        <div className="card-header">
                            <h4>Attendace Stats</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="d-flex align-items-center">
                                        <svg className="bi text-primary" width="32" height="32" fill="blue"
                                            style={{width:"10px"}}>
                                            <use
                                                xlinkHref="assets/images/bootstrap-icons.svg#circle-fill" />
                                        </svg>
                                        <h5 className="mb-0 ms-3">Boys</h5>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <h5 className="mb-0">862</h5>
                                </div>
                                <div className="col-12">
                                    <div id="chart-europe"></div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="d-flex align-items-center">
                                        <svg className="bi text-success" width="32" height="32" fill="blue"
                                            style={{width:"10px"}}>
                                            <use
                                                xlinkHref="assets/images/bootstrap-icons.svg#circle-fill" />
                                        </svg>
                                        <h5 className="mb-0 ms-3">Girls</h5>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <h5 className="mb-0">375</h5>
                                </div>
                                <div className="col-12">
                                    <div id="chart-america"></div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="d-flex align-items-center">
                                        {/* <svg className="bi text-danger" width="32" height="32" fill="blue"
                                            style={{width:"10px"}}>
                                            <use
                                                xlinkHref="assets/images/bootstrap-icons.svg#circle-fill" />
                                        </svg> */}
                                        <h5 className="mb-0 ms-3"></h5>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <h5 className="mb-0"></h5>
                                </div>
                                <div className="col-12">
                                    <div id="chart-indonesia"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-xl-8">
                    <div className="card">
                        <div className="card-header">
                            <h4>Latest Comments</h4>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover table-lg">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Comment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="col-3">
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar avatar-md">
                                                        <img src="assets/images/faces/5.jpg"/>
                                                    </div>
                                                    <p className="font-bold ms-3 mb-0">Name Name</p>
                                                </div>
                                            </td>
                                            <td className="col-auto">
                                                <p className=" mb-0">Congratulations on your graduation!</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="col-3">
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar avatar-md">
                                                        <img src="assets/images/faces/2.jpg"/>
                                                    </div>
                                                    <p className="font-bold ms-3 mb-0">Name Name</p>
                                                </div>
                                            </td>
                                            <td className="col-auto">
                                                <p className=" mb-0">Wow amazing!</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-12 col-lg-3">
            <div className="card">
                <div className="card-body py-4 px-4">
                    <div className="d-flex align-items-center">
                        <div className="avatar avatar-xl">
                            <img src="assets/images/faces/1.jpg" alt="Face 1"/>
                        </div>
                        <div className="ms-3 name">
                            <h5 className="font-bold">Top student</h5>
                            <h6 className="text-muted mb-0">Name Name</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <h4>Recent Students</h4>
                </div>
                <div className="card-content pb-4">
                    <div className="recent-message d-flex px-4 py-3">
                        <div className="avatar avatar-lg">
                            <img src="assets/images/faces/4.jpg"/>
                        </div>
                        <div className="name ms-4">
                            <h5 className="mb-1">student name</h5>
                            {/* <h6 className="text-muted mb-0">@johnducky</h6> */}
                        </div>
                    </div>
                    <div className="recent-message d-flex px-4 py-3">
                        <div className="avatar avatar-lg">
                            <img src="assets/images/faces/5.jpg"/>
                        </div>
                        <div className="name ms-4">
                            <h5 className="mb-1">student name</h5>
                            {/* <h6 className="text-muted mb-0">@imdean</h6> */}
                        </div>
                    </div>
                    <div className="recent-message d-flex px-4 py-3">
                        <div className="avatar avatar-lg">
                            <img src="assets/images/faces/1.jpg"/>
                        </div>
                        <div className="name ms-4">
                            <h5 className="mb-1">student name</h5>
                            {/* <h6 className="text-muted mb-0">@dodoljohn</h6> */}
                        </div>
                    </div>
                    <div className="px-4">
                        <button class='btn btn-block btn-xl btn-outline-primary font-bold mt-3'>View Students</button>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <h4>Visitors Profile</h4>
                </div>
                <div className="card-body">
                    <div id="chart-visitors-profile"></div>
                </div>
            </div>
        </div>
    </section>
</div>
    </div>
  )
}

export default MainLayoutAuth(Home)