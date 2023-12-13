import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
// import Toastify from "toastify-js";
// import "toastify-js/src/toastify.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // const [_,refresh] = useState({})
  // console.log("token",token);

  const data = {
    email: loginEmail,
    password: loginPassword,
    // token:token
  };


  function loginSubmit(e) {
    e.preventDefault();

    // const options = {
    //   headers: {
    //     "Content-Type": "application/json;charset=UTF-8",
    //     "Access-Control-Allow-Origin": "*",
    //     token: token,
    //   },
    // };


    axios
      .post(`${baseURL}/adminauth/suadminlogin`, data, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          // "Access-Control-Allow-Origin": "*",
          token: token,
        },
      })
      .then((response) => {

        if (response.data.status === 201) {
          toast(response.data.message,{
            position: "top-right",
            autoClose: 2500,
            type:"error",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            })
        } else {
          localStorage.setItem("bike_token", response.data.response.token);
          toast(response.data.response.message,{
            position: "top-right",
            autoClose: 2500,
            type:"success",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            })
            setTimeout(()=>{
              navigate("/");
            },2000);
        }
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("bike_token");
    if(token){
      navigate("/")
    }
    axios.get(`${baseURL}/tokenGenrate/jwtToken`).then((response) => {

      setToken(response.data.token);
    });
  }, [navigate,baseURL]);



  return (
    <div className="login" style={{ height: "635px", background: "#bbbbbb" ,"backgroundImage": "url(images/bg.jpg)" ,"backgroundSize": "cover", "backgroundPosition": "center"}}>
      <section className="main-area">
        <div className="container-fluid">
          <div className="col-md-6 p-0" style={{"width":"100%"}}>
            <div className="login" style={{ "paddingTop": "5rem" }}>
              <div className="center-box">
                <div className="logo"  style={{ "textAlign": "center" }}>
                  <div className="bgd">
                  <img
                    src="images/logo.png"
                    className="logo-img"
                    style={{ width: "150px"}}
                    alt="#"
                  />
                  </div>
                </div>
                <div
                  className="title ttle"
                >
                  <h4 className="login_head" style={{"color": "#00bcd4","marginTop": "0.2rem"}}>Admin Login</h4>
                  {/* <p className="login-para">This is a secure system and you will need to provide your <br/>
                                    login details to access the site.</p> */}
                </div>
                <div className="form-wrap lgn">
                  <form
                    // role="form"
                    className="pui-form"
                    id="loginform"
                    method="POST"
                    onSubmit={loginSubmit}
                  >
                    <input
                      type="hidden"
                      name="_token"
                      value="oKup3nu5kd6tUBCqoFTVEMtnOOg1p3zubico9KkM"
                    />
                    <div className="pui-form__element">
                      <label className="animated-label " style={{"color": "#ff6a00"}} >Email</label>
                      <input
                        id="inputEmail"
                        name="email"
                        type="email"
                        className="form-control"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="Enter Email"
                        required
                      />
                    </div>


                    <div className="pui-form__element">
                      <label className="animated-label" style={{"color": "#ff6a00"}} >Password</label>
                      <input
                        id="inputPassword"
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="form-control "
                        name="password"
                        placeholder="Enter Password"
                        required
                      />
                    </div>


                    <div
                      className="pui-form__element"
                      style={{ "paddingTop": "2rem" }}
                    >
                      <button
                        className="btn btn-lg btn-primary btn-block btn-salon"
                        type="submit"
                      >
                        SIGN IN
                      </button>
                      <ToastContainer />
                    </div>


                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;