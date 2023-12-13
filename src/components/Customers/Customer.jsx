import { Link } from "react-router-dom";
import Footer from "../home/Footer";
import Header from "../home/Header";
import React, { useEffect, useState ,useRef} from "react";
import { useNavigate } from "react-router";
import axios from "axios";
// import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
// import { useNavigate } from "react-router";
import _ from "lodash"
// import * as XLSX from 'xlsx';
// import Button from '@mui/material/Button';
import { DownloadTableExcel } from 'react-export-table-to-excel';


const pageSize = 10;
const Customer = () => {

  const tableRef = useRef(null);

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();

  // const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [paginatedUsers,setpaginatedUsers] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [currentPage,setcurrentPage] = useState(1);
  
  const [order,setOrder] = useState("ASC");

  // Export into Excel file
  // const HandleOnExport = () =>{
  //   var wb = XLSX.utils.book_new();
  //   var ws = XLSX.utils.json_to_sheet(users);
  //   XLSX.utils.book_append_sheet(wb,ws,"Customer");

  //   XLSX.writeFile(wb,"CustomerTable.xlsx")
  // }

  // sorting tables
  const sorting = (col) =>{
    if(order === "ASC"){
      const sorted = [...paginatedUsers].sort((a,b)=>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1:-1
      )
      setpaginatedUsers(sorted);
      setOrder("DSC")
    }
    if(order === "DSC"){
      const sorted = [...paginatedUsers].sort((a,b)=>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1:-1
      )
      setpaginatedUsers(sorted);
      setOrder("ASC")
    }
  }


  useEffect(() => {
    const token = localStorage.getItem("bike_token");
    if (token === null) {
      navigate("/login");
    }
    const options = {
      headers: {
        token: token,
      },
    };

    axios.get(`${baseURL}/customers/customerlist`, options).then((response) => {
      // console.log(response.data.data);
      setUsers(response.data.data);
      setpaginatedUsers(_(response.data.data).slice(0).take(pageSize).value());
    });
  }, [navigate,baseURL]);


  const pageCount = users? Math.ceil(users.length/pageSize):0;
  // if(pageCount==1)return null;
  const pages = _.range(1,pageCount+1)

  const Paginations = (pageNo) =>{
    setcurrentPage(pageNo);
    const startIndex = (pageNo - 1 )* pageSize;
    const paginatedUserss = _(users).slice(startIndex).take(pageSize).value();
    setpaginatedUsers(paginatedUserss);
  }


  return (
    <>
      <div class="main-content">
        <Header />
        <div
          class="header pt-7"
          Style="background-image: url(images/bg.jpg); background-size: cover; background-position: center center;"
        >
          <span class="mask bg-gradient-dark opacity-7"></span>
          <div class="container-fluid">
            <div class="header-body">
              <div class="row align-items-center py-4 pb-7">
                <div class="col-lg-6 col-7">
                  <h6 class="h2 text-white d-inline-block mb-0">Customers</h6>
                  <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                    <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                      <li class="breadcrumb-item text-white">
                        <Link to="/dashboard">
                          <i class="fa fa-home text-primary"></i>
                        </Link>
                      </li>
                      <li class="breadcrumb-item active text-white">Customers</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Page content --> */}
        <div
          class="container-fluid mt--6 mrgn"
          Style="background-image: url(images/bg.jpg); background-size: cover; background-position: center center;"
        >
          <div class="row" style={{"padding-bottom": "2rem"}}>
            <div class="col">
              <div class="card">
                {/* <!-- Card header --> */}
                <div class="card-header algn">
                  <h3 class="mb-0">Customers Table</h3>
                  <div style={{ "width": "50%", "display": "inline-flex", "align-items": "center", "justify-content": "space-evenly" }} className="algn">
                  <input type="text"
                      placeholder="search..."
                      className="form-control"
                      style={{ "width": "70%" }}
                      onChange={(e) => setSearchItem(e.target.value)}
                    />
                  <div style={{ "margin-left": "5px" }}>
                    <DownloadTableExcel
                      filename="Customers_table"
                      sheet="Customers"
                      currentTableRef={tableRef.current}
                      
                    >
                     <button style={{"color": "black","background": "#9e9e9e"}}> Export excel </button>
                    </DownloadTableExcel>
                  </div>
                  
                  </div>
                  {/* <Link to="/createnew" class="btn btn-sm btn-primary float-right mt--4"><i class="fa fa-plus mr-1"></i> New</Link> */}
                </div>

                
                {/* <!-- Light table --> */}
                <div class="table-responsive">
                  <table
                    class="table dataTable align-items-center table-flush"
                    id="dataTableReport"
                    ref={tableRef}
                  >
                    <thead class="thead-light">
                      <tr>
                        {/* <th class="sort" scope="col">
                          #
                        </th> */}
                        <th class="sort" scope="col">
                          id
                        </th>
                        <th class="sorting_asc" scope="col" onClick={()=>sorting("first_name")}>
                          Name
                        </th>
                        <th class="sorting_asc" scope="col" onClick={()=>sorting("email")}>
                          Email
                        </th>
                        <th class="sort" scope="col">
                          Phone
                        </th>
                        <th class="sorting_asc" scope="col" onClick={()=>sorting("email")}>
                          City
                        </th>
                        <th class="sorting_asc" scope="col" onClick={()=>sorting("email")}>
                          State
                        </th>
                        <th class="sorting_asc" style={{"width":"40%"}} scope="col" onClick={()=>sorting("email")}>
                          Address
                        </th>
                        {/* <th class="sort" scope="col">
                          Action
                        </th> */}
                        <th></th>
                      </tr>
                    </thead>
                    <tbody class="list">
                      {paginatedUsers.filter((val)=>{
                          if(searchItem === ""){
                            return val;
                          } else if(
                            // val._id.includes(searchItem) ||
                            val.first_name.toLowerCase().includes(searchItem.toLowerCase()) ||
                            val.city.toLowerCase().includes(searchItem.toLowerCase()) ||
                            val.state.toLowerCase().includes(searchItem.toLowerCase()) ||
                            val.address.toLowerCase().includes(searchItem.toLowerCase()) ||
                            val.phone.toString().includes(searchItem.toString())||
                            val.email.includes(searchItem)
                          ){
                            return val;
                          }
                        }).map((data, i) => (
                        <tr>
                          {/* <th>{parseInt((currentPage-1)*10)+(i+1)}</th> */}
                          <td>{data.id}</td>
                          <td>{data.first_name + " " + data.last_name}</td>
                          <td>{data.email}</td>
                          <td>{data.phone}</td>
                          <td>{data.city}</td>
                          <td>{data.state}</td>
                          <td style={{"width":"40%"}}>{data.address}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <nav className="d-flex justify-content-center">
                    <ul class="pagination">
                      {
                        pages.map((page)=>(
                          <li className={
                            page === currentPage ? "page-item active": "page-item"
                          }
                          Style={pageCount === 1 ? "display:none":"display:flex"}
                          >
                          <p className="page-link" onClick={()=>Paginations(page)}>{page}</p>
                          </li>
                        ))
                      }
                    </ul>
                  </nav>
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


export default Customer;

