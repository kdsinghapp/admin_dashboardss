import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../home/Footer";
import Header from "../home/Header";
import { useNavigate } from "react-router";
import axios from "axios";


const Dashboard = () => {

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();

  // const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [service, setService] = useState([]);
  const [booking, setBooking] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("bike_token");
    if (token === null) {
      navigate("/login");
    }

    if (token) {
      const options = {
        headers: {
          token: token,
        },
      };

      axios.get(`${baseURL}/customers/customerlist`, options).then((response) => {
        // console.log(response.data.data);
        setUsers(response.data?.data);
      });

      axios.get(`${baseURL}/dealer/dealerList`, options).then((response) => {
        // console.log(response.data.data);
        setVendor(response.data?.data);
      });

      axios.get(`${baseURL}/service/servicelist`, options).then((response) => {
        // console.log(response.data.data);
        setService(response.data.data);
      });

      axios
        .get(`${baseURL}/bookings/getallbookings`, options)
        .then((response) => {
          // console.log(response.data.data);
          setBooking(response.data.data);
        });

      axios
        .get(`${baseURL}/adminauth/getalladmin`, options)
        .then((response) => {
          // console.log(response.data.data);
          setAdmins(response.data.data);
        });

      axios
        .get(`${baseURL}/bike/bikeList`, options)
        .then((response) => {
          // console.log(response.data.data);
          setBikes(response.data.data);
        });

      axios
        .get(`${baseURL}/offer/offerlist`, options)
        .then((response) => {
          // console.log(response.data.data);
          setOffers(response.data.data);
        });
    }
    // eslint-disable-next-line
  }, []);


  // useEffect(()=>{
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 100);
  // });

  return (
    <>
      <div className="main-content">
        <Header />

        {/* <!-- Top 4 cards --> */}
        <div
          className="header pt-9"
          Style="background-image: url(images/bgsssss.jpg); background-size: cover; background-position: center center;padding-bottom: 50px;"
        >
          <span className="mask bg-gradient-dark opacity-7"></span>
          <div className="container-fluid">
            <div className="header-body mt--4 mrgns">


              <div className="row align-items-center pb-4">
                <div className="col-lg-6 col-7">
                  <h6 className="h2 text-white d-inline-block">Dashboard</h6>
                  <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
                    <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                      <li className="breadcrumb-item text-white">
                        <Link to="/dashboard">
                          <i className="fa fa-home text-primary"></i>
                        </Link>
                      </li>
                      <li
                        className="breadcrumb-item active text-white"
                        aria-current="page"
                      >
                        {" "}
                        Dashboard{" "}
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              {/* <!-- Card stats --> */}
              <div className="row">


                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0" style={{ "font-weight": "800" }}>
                            Bookings
                          </h5>
                          <span
                            className="h2 font-weight-bold mb-0"
                            style={{ color: "#2700ff", "font-size": "1.7rem" }}
                          >
                            {booking?.length}
                          </span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fa fa-shopping-bag"></i>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-nowrap">Since app launch</span>
                      </p>
                    </div>
                  </div>
                </div>


                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0" style={{ "font-weight": "800" }}>
                            Services
                          </h5>
                          <span
                            className="h2 font-weight-bold mb-0"
                            style={{ color: "#2700ff", "font-size": "1.7rem" }}
                          >
                            {service?.length}
                          </span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                            <i className="fas fa-list"></i>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-nowrap">Since app launch</span>
                      </p>
                    </div>
                  </div>
                </div>


                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0" style={{ "font-weight": "800" }}>
                            Bikes
                          </h5>
                          <span
                            className="h2 font-weight-bold mb-0"
                            style={{ color: "#2700ff", "font-size": "1.7rem" }}
                          >
                            {bikes?.length}
                          </span>
                        </div>
                        <div className="col-auto">
                          <div style={{ "background-color": "rgb(46 0 169)" }} className="icon icon-shape text-white rounded-circle shadow">
                            <i className="fas fa-motorcycle"></i>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-nowrap">Since app launch</span>
                      </p>
                    </div>
                  </div>
                </div>


                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0" style={{ "font-weight": "800" }}>
                            Offers
                          </h5>
                          <span
                            className="h2 font-weight-bold mb-0"
                            style={{ color: "#2700ff", "font-size": "1.7rem" }}
                          >
                            {offers?.length}
                          </span>
                        </div>
                        <div className="col-auto">
                          <div style={{ "background-color": "#1cab21" }} className="icon icon-shape text-white rounded-circle shadow">
                            <i className="fas fa-gift"></i>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-nowrap">Since app launch</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0" style={{ "font-weight": "800" }}>
                            Admins
                          </h5>
                          <span
                            className="h2 font-weight-bold mb-0"
                            style={{ color: "#2700ff", "font-size": "1.7rem" }}
                          >
                            {admins?.length}
                          </span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fa fa-user-secret"></i>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-nowrap">Since app launch</span>
                      </p>
                    </div>
                  </div>
                </div>


                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0" style={{ "font-weight": "800" }}>
                            Customers
                          </h5>
                          <span
                            className="h2 font-weight-bold mb-0"
                            style={{ color: "#2700ff", "font-size": "1.7rem" }}
                          >
                            {users?.length}
                          </span>
                        </div>
                        <div className="col-auto">
                          <div style={{ "background-color": "blue" }} className="icon icon-shape text-white rounded-circle shadow">
                            <i className="fa fa-users"></i>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-nowrap">Since app launch</span>
                      </p>
                    </div>
                  </div>
                </div>


                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0" style={{ "font-weight": "800" }}>
                            Dealers
                          </h5>
                          <span
                            className="h2 font-weight-bold mb-0"
                            style={{ color: "#2700ff", "font-size": "1.7rem" }}
                          >
                            {vendor?.length}
                          </span>
                        </div>
                        <div className="col-auto">
                          <div style={{ "background-color": "#00a6ff" }} className="icon icon-shape text-white rounded-circle shadow">
                            <i className="fa fa-user-circle-o"></i>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-nowrap">Since app launch</span>
                      </p>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};


export default Dashboard;
