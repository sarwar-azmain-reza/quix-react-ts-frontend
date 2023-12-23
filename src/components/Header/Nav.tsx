import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import { getNavItems } from "../../utils/getNavItems";

const Nav = () => {
  const { user, setUser, setLoggedToken } = useAuth();
  const navigate = useNavigate();

  const renderNavItems = () => {
    if (user) {
      console.log(user)
      const navItems = getNavItems(user.role)
      return navItems.map((item) => {
        return (
          <li className="text-lg font-semibold"><Link to={`${item.path}`}>{item.name}</Link></li>
        )
      })
    } else {
      console.log(user)
      return (
        <li className="text-lg font-semibold"><Link to='/login-signup'>Login</Link></li>
      )
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("quix-token");
    localStorage.clear();
    setLoggedToken({ quix_token: null });
    setUser(null);
    navigate('/login-signup')
  };

  return (
    <div className="navbar bg-[#F4DFC8]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {renderNavItems()}
          </ul>
        </div>
        <p className=" text-xl font-bold">QuiX</p>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {renderNavItems()}
        </ul>
      </div>
      {user && <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-[#F4DFC8] rounded-box w-52 h-20">
            <li className="text-lg font-semibold cursor-pointer" onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      </div>}
    </div>
  );
};

export default Nav;