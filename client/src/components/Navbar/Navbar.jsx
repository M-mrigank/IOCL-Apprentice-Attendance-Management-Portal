import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.gif'
import './Navbar.css';
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import Avatar from '../../components/Avatar/Avatar';
import Button from '../../components/Button/Button';
import {toast} from 'react-hot-toast';
import {useSelector, useDispatch} from "react-redux";
import { setCurrentUser } from '../../actions/currentUser';
import {useNavigate} from "react-router-dom";

const Navbar = (props) => {
  // let isLoggedin=props.isLoggedIn;
  // let setIsLoggedIn=props.setIsLoggedIn;

  const dispatch=useDispatch();
  const navigate=useNavigate();


  var User=useSelector((state)=>(state.currentUserReducer));

  const handleLogout =()=>{
    dispatch({
      type:'LOGOUT',
    });
    // setIsLoggedIn(false);
    toast.success("Logged Out");
    navigate('/');
    dispatch(setCurrentUser(null));
  }

  useEffect(()=>{
    // console.log("here is useeffect");
    // console.log(isLoggedin);
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
  }, [dispatch]);


  console.log("user",User);
  console.log("user name",User?.user?.firstName?.charAt(0));
  // console.log(isLoggedin);


  return (
    <nav className='flex justify-evenly items-center'>
        <div class="flex  justify-between items-center w-4/5">
            <Link to="/" className="nav-item nav-logo">
              <img src={logo} alt="logo" className="h-14"/>
            </Link>

            <div>
              <ul className="flex justify-center items-center">
                <li>
                  <Link to="" className="nav-item nav-btn">Home</Link>
                </li>

                <li>
                  <Link to="https://iocl.com/barauni-refinery" className="nav-item nav-btn">About</Link>
                </li>
                <li>
                  {
                    User &&
                      <Link className="nav-item nav-btn" to="/Dashboard">Dashboard</Link>
                  }
                </li>
              </ul>
            </div>

            <div>
              {User===null &&
                <div className='flex justify-between align-center gap-3'>
                  
                  <Link to={"/Login"} className="font-semibold text-lg flex justify-between align-center">
                  
                  <div className="absolute  z-20 p-2 pt-4"><CiLogin fontSize={19}/></div>
                  <div className="nav-links relative p-2.5 pr-3 pl-8 hover:bg-orange-300 hover:rounded-3xl hover:transition hover:duration-150">Login</div>
                  </Link>

                  <Link className="p-2 pt-2.5 pl-3 pr-3 nav-links font-semibold text-lg hover:bg-orange-300 hover:rounded-3xl hover:transition hover:duration-150" to="/Signup">
                    Signup
                  </Link>
                </div> 
                
              }
              {
                User &&

                <div className="flex justify-between align-center gap-3">

                  <Link to={'/User'} style={{textDecoration: "none"}} className='mt-1.5'>
                    <Avatar backgroundColor='orange' px='10px' py='7px' color="white" borderRadius='50%' fontSize='large' cursor='pointer'>
                      {User?.user?.firstName?.charAt(0).toUpperCase()}
                    </Avatar>
                  </Link>

                  <button className='font-semibold text-lg flex justify-between ' onClick={handleLogout}>
                    <div className="nav-links relative p-2.5 pr-8 pl-4 hover:bg-orange-300 hover:rounded-3xl">Logout</div>
                    <div className="absolute ml-20 mt-4"><CiLogout/></div>
                  </button>
                </div>
                
              }
            </div>
        </div>
    </nav>
  )
}

export default Navbar