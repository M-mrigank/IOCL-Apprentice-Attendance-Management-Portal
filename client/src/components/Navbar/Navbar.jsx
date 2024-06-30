import React, {useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
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

  const location=useLocation();


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


  // console.log("user",User);
  // console.log("user name",User?.user?.firstName?.charAt(0));
  // console.log(isLoggedin);


  return (
    <div className='flex justify-evenly items-center h-20 bg-stone-300 w-[100%]'>

      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
            <Link to="/">
              <img src={logo} alt="logo"  width={160} height={32} className="h-14" loading='lazy'/>
            </Link>

      
        <nav className="hidden md:block">
              <ul className="flex justify-center items-center gap-x-6">
                <li>
                  <Link to="" className="font-semibold text-xl hover focus:bg-orange-200 hover:rounded hover:bg-orange-100 hover:pl-3 hover:pr-3 hover:pt-2 hover:pb-2 hover:shadow-lg focus:rounded-xl focus:pl-3 focus:pr-3 focus:pt-2 focus:pb-2 focus:shadow-lg">Home</Link>
                </li>

                <li>
                  <Link to="https://iocl.com/barauni-refinery" className="font-semibold text-xl focus:rounded-xl focus:bg-orange-200 focus:pl-3 focus:pr-3 focus:pt-2 focus:pb-2 focus:shadow-lg  hover:rounded hover:bg-orange-100 hover:pl-3 hover:pr-3 hover:pt-2 hover:pb-2 hover:shadow-lg">About</Link>
                </li>
                <li>
                  {
                    (User && location.pathname!=='/verify-email') &&
                      <Link className="font-semibold text-xl focus:rounded-xl focus:bg-orange-200 focus:pl-3 focus:pr-3 focus:pt-2 focus:pb-2 focus:shadow-lg  hover:rounded hover:bg-orange-100 hover:pl-3 hover:pr-3 hover:pt-2 hover:pb-2 hover:shadow-lg" to="/Dashboard">Dashboard</Link>
                  }
                </li>
              </ul>

        </nav>

        <div className="hidden items-center gap-x-4 md:flex">
          {(User===null && location.pathname!=='/verify-email') &&
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
            (User && location.pathname!=='/verify-email') &&

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
    </div>
  )
}

export default Navbar