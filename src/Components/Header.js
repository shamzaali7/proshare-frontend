import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../index';

function Header({
  showMobileMenu,
  showProfileDropdown,
  showProfilePictureModal,
  onMobileMenuToggle,
  onProfileDropdownToggle,
  onProfilePictureModalToggle
}) {
  const { 
    user, 
    authorized, 
    handleGoogleLogin, 
    handleLogout,
    updateUserProfilePicture,
    loading 
  } = useContext(AppContext);
  
  const [profilePic, setProfilePic] = useState({ profilePicture: "" });
  const navigate = useNavigate();

  const fileViewer = (e) => {
    setProfilePic({
      profilePicture: e.target.value
    });
  };

  const fileUploader = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfilePicture(profilePic.profilePicture);
      setProfilePic({ profilePicture: "" });
    } catch (err) {
      console.log("Error updating profile picture:", err);
    }
    onProfilePictureModalToggle();
  };

  const onLogout = async (e) => {
    e.preventDefault();
    navigate("/");
    await handleLogout();
  };

  const hi = authorized && user ? `Hi ${user.firstName}!` : "";

  return (
    <div className="container-header">   
      <div className="bg-gray-200 h-full w-full">
        <nav className="bg-white shadow xl:block hidden">
          <div className="mx-auto container px-6 py-2 xl:py-0">
            <div className="flex items-center justify-between">
              <div className="flex w-full sm:w-auto items-center sm:items-stretch justify-end sm:justify-start">
                <div className="flex items-center">
                  <Link to="/">
                    <div className="flex items-center">
                      <img src="https://img.icons8.com/clouds/70/000000/code.png" alt="logo" />
                      <h2 className="hidden change-text-title sm:block text-base text-gray-600 font-bold leading-normal px-3 font-change">
                        PROSHARE
                      </h2>
                    </div>
                  </Link>
                </div>
              </div>
              
              <div className="flex">
                <div className="hidden xl:flex md:mr-6 xl:mr-16">
                  {authorized && (        
                    <Link to="/accounts" className="focus:text-indigo-700 border-b-2 border-transparent focus:border-indigo-700 flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                      <span className="mr-2">
                        <img className="icon icon-tabler icon-tabler-grid" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg4.svg" alt="dashboard" />
                      </span>
                      Dashboard
                    </Link>
                  )}
                  
                  <Link to="/ide" className="focus:text-indigo-700 border-b-2 border-transparent focus:border-indigo-700 flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                    <span className="mr-2">
                      <img className="icon icon-tabler icon-tabler-puzzle" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg5.svg" alt="products" />
                    </span>
                    Test
                  </Link>
                  
                  <Link to="/search" className="focus:text-indigo-700 border-b-2 border-transparent focus:border-indigo-700 flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                    <span className="mr-2">
                      <img className="icon icon-tabler icon-tabler-puzzle h-5 w-5" src="https://img.icons8.com/external-tanah-basah-detailed-outline-tanah-basah/96/null/external-search-user-interface-tanah-basah-detailed-outline-tanah-basah.png" alt="products" />
                    </span>
                    Search
                  </Link>
                </div>
                
                {authorized && (
                  <div className="hidden xl:flex items-center">
                    <div className="ml-6 relative">
                      <div className="flex items-center relative" onClick={onProfileDropdownToggle}>
                        <div className="hi mx-2 text-gray-700 font-change">{hi}</div>
                        {showProfileDropdown && (
                          <ul className="p-2 w-40 border-r bg-white absolute rounded right-0 shadow top-0 mt-16 z-50">
                            <li className="cursor-pointer text-gray-800 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                              <div onClick={onLogout} className="flex items-center">
                                <img className="w-6 h-6" src="https://img.icons8.com/windows/96/null/exit.png" alt="Logout Icon"/>
                                <span className="ml-2">Logout</span>
                              </div>
                            </li>
                            <li className="cursor-pointer text-gray-800 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                              <div onClick={onProfilePictureModalToggle} className="flex items-center">
                                <img className="w-6 h-6" src="https://img.icons8.com/windows/96/null/edit-user.png" alt="Edit Icon"/>
                                <span className="ml-2">Change Picture</span>
                              </div>
                            </li>
                          </ul>
                        )}
                        <div className="cursor-pointer flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out">
                          {user.profilePicture ? (
                            <img className="rounded-full h-10 w-10 object-cover" src={user.profilePicture} alt="profile" />
                          ) : (
                            <img src="https://img.icons8.com/ios/50/null/user-male-circle--v1.png" className="w-8 h-8" alt="Profile Pic"/>
                          )}
                        </div>
                        <div className="ml-2 text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down cursor-pointer" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {!authorized && (
                  <div onClick={handleGoogleLogin} className="focus:text-indigo-700 border-b-2 border-transparent focus:border-indigo-700 flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out cursor-pointer">
                    <div className="box-signin">
                      <button disabled={loading}>
                        {loading ? "Signing in..." : (
                          <>
                            Login with <span className="google-blue">G</span><span className="google-red">o</span><span className="google-yellow">o</span><span className="google-blue">g</span><span className="google-green">l</span><span className="google-red">e</span>
                          </>
                        )}
                      </button> 
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        
        {/* Mobile Navigation */}
        <nav>
          <div className="py-4 px-6 w-full flex xl:hidden justify-between items-center bg-white fixed top-0 z-40">
            <div className="flex items-center">
              <div id="menu" className="text-gray-800" onClick={onMobileMenuToggle}>
                {showMobileMenu ? (
                  <div className="filler"></div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1={4} y1={6} x2={20} y2={6} />
                    <line x1={4} y1={12} x2={20} y2={12} />
                    <line x1={4} y1={18} x2={20} y2={18} />
                  </svg>
                )}
              </div>
            </div>
          </div>
          
          <div className={showMobileMenu ? "w-full xl:hidden h-full absolute z-40 transform translate-x-0" : "w-full xl:hidden h-full absolute z-40 transform -translate-x-full"}>
            <div className="bg-gray-800 opacity-50 w-full h-full" onClick={onMobileMenuToggle} />
            <div className="w-64 z-40 fixed overflow-y-auto top-0 bg-white shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
              <div className="px-6 h-full">
                <div className="flex flex-col justify-between h-full w-full">
                  <div>
                    <div className="mt-6 flex w-full items-center justify-between">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <Link to="/" onClick={onMobileMenuToggle}>
                            <div className="flex items-center">
                              <img src="https://img.icons8.com/clouds/70/000000/code.png" alt="logo" />
                              <p className="font-change text-base md:text-2xl text-gray-800 ml-3">PROSHARE</p>
                            </div>
                          </Link>
                        </div>
                        <div id="cross" className="text-gray-800" onClick={onMobileMenuToggle}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1={18} y1={6} x2={6} y2={18} />
                            <line x1={6} y1={6} x2={18} y2={18} />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <ul className="f-m-m">
                      {authorized && (
                        <Link to="/accounts" className="cursor-pointer" onClick={onMobileMenuToggle}>
                          <li className="text-gray-800 pt-10">
                            <div className="flex items-center">
                              <div className="w-6 h-6 md:w-8 md:h-8 text-gray-800">
                                <span className="mr-2">
                                  <img className="icon icon-tabler icon-tabler-grid w-7 h-7" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg4.svg" alt="dashboard" />
                                </span>
                              </div>
                              <p className="text-gray-800 xl:text-base text-base ml-3">Dashboard</p>
                            </div>
                          </li>
                        </Link>
                      )}
                      
                      <Link to="/ide" className="cursor-pointer" onClick={onMobileMenuToggle}>
                        <li className="text-gray-800 pt-8">
                          <div className="flex items-center">
                            <div className="flex items-center">
                              <div className="w-6 h-6 md:w-8 md:h-8 text-gray-800">
                                <span className="mr-2">
                                  <img className="icon icon-tabler icon-tabler-puzzle w-7 h-7" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg5.svg" alt="products" />
                                </span>
                              </div>
                              <p className="text-gray-800 xl:text-base text-base ml-3">Test</p>
                            </div>
                          </div>
                        </li>
                      </Link>
                      
                      <Link to="/search" onClick={onMobileMenuToggle}>
                        <li className="text-gray-800 pt-8 cursor-pointer">
                          <div className="flex items-center">
                            <div className="flex items-center">
                              <div className="w-6 h-6 md:w-8 md:h-8 text-gray-800 ml-1">
                                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                                  <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z"/>
                                </svg>
                              </div>
                              <p className="text-gray-800 xl:text-base text-base ml-3">Search</p>
                            </div>
                          </div>
                        </li>
                      </Link>
                    </ul>
                  </div>
                  
                  {authorized ? (
                    <div className="w-full pt-4">
                      <div className="flex mb-4 w-full justify-center cursor-pointer" onClick={onLogout}>
                        <div className="flex items-center text-right">
                          <div className="flex items-center">
                            <img className="h-8 w-8" src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/96/null/external-smartphone-with-logout-option-with-sign-off-arrow-development-shadow-tal-revivo.png" alt="Logout Icon"/>
                            <span className="ml-2">Logout</span>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-300 items-center text-right">
                        <div className="w-full flex items-center justify-center pt-1">
                          <div className="flex items-center text-right">
                            {user.profilePicture ? (
                              <img src={user.profilePicture} alt="profile" className="w-8 h-8 rounded-md" />
                            ) : (
                              <img src="https://img.icons8.com/ios/50/null/user-male-circle--v1.png" alt="ProfilePic" className="h-8 w-8"/>
                            )}
                            <p className="text-gray-800 text-base leading-4 ml-2">{user.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="box-signin hover:bg-slate-200 rounded-2xl">
                      <button 
                        className="text-base py-1 px-2" 
                        onClick={handleGoogleLogin}
                        disabled={loading}
                      >
                        {loading ? "Signing in..." : (
                          <>
                            Login with <span className="google-blue">G</span><span className="google-red">o</span><span className="google-yellow">o</span><span className="google-blue">g</span><span className="google-green">l</span><span className="google-red">e</span>
                          </>
                        )}
                      </button> 
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>  
      </div>
      
      {/* Profile Picture Modal */}
      {showProfilePictureModal && (
        <div className="modal">
          <div onClick={onProfilePictureModalToggle} className="overlay"></div>
          <div className="modal-content">
            <div className="text-center ml-12 mr-12 items-center justify-center">
              <div className="mb-3">Enter the link address of the picture</div>
              <input 
                onChange={fileViewer} 
                value={profilePic.profilePicture}
                className="h-8 w-30 text-center bg-slate-600 text-white mb-2"
                placeholder="https://..."
              />
              <div>
                <button 
                  onClick={fileUploader} 
                  className="modal-submit h-8 w-30 text-center btn-update-project mr-2"
                  disabled={!profilePic.profilePicture.trim()}
                >
                  Submit Picture
                </button>
                <button onClick={onProfilePictureModalToggle} className="mt-2">
                  Cancel
                </button>
              </div>
            </div>
          </div>             
        </div>
      )}
    </div>
  );
}

export default Header;