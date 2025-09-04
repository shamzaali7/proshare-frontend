import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../index';
import './Header.css';

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
        {/* Desktop Navigation */}
        <nav className="header-nav desktop">
          <div className="header-container">
            <div className="header-content">
              <div className="logo-section">
                <Link to="/" className="logo-link">
                  <img src="https://img.icons8.com/clouds/70/000000/code.png" alt="logo" />
                  <h2 className="logo-text hidden sm:block change-text-title font-change">
                    PROSHARE
                  </h2>
                </Link>
              </div>
              
              <div className="flex">
                <div className="nav-links">
                  {authorized && (        
                    <Link to="/accounts" className="nav-link">
                      <span className="nav-link-icon">
                        <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg4.svg" alt="dashboard" />
                      </span>
                      Dashboard
                    </Link>
                  )}
                  
                  <Link to="/ide" className="nav-link">
                    <span className="nav-link-icon">
                      <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg5.svg" alt="products" />
                    </span>
                    Test
                  </Link>
                  
                  <Link to="/search" className="nav-link">
                    <span className="nav-link-icon">
                      <img className="h-5 w-5" src="https://img.icons8.com/external-tanah-basah-detailed-outline-tanah-basah/96/null/external-search-user-interface-tanah-basah-detailed-outline-tanah-basah.png" alt="search" />
                    </span>
                    Search
                  </Link>
                </div>
                
                {authorized && (
                  <div className="user-section">
                    <div className="user-dropdown">
                      <div className="user-dropdown-trigger" onClick={onProfileDropdownToggle}>
                        <div className="user-greeting font-change">{hi}</div>
                        {showProfileDropdown && (
                          <div className="user-dropdown-menu">
                            <div className="user-dropdown-item" onClick={onLogout}>
                              <img src="https://img.icons8.com/windows/96/null/exit.png" alt="Logout Icon"/>
                              <span>Logout</span>
                            </div>
                            <div className="user-dropdown-item" onClick={onProfilePictureModalToggle}>
                              <img src="https://img.icons8.com/windows/96/null/edit-user.png" alt="Edit Icon"/>
                              <span>Change Picture</span>
                            </div>
                          </div>
                        )}
                        <div className="user-avatar">
                          {user.profilePicture ? (
                            <img src={user.profilePicture} alt="profile" />
                          ) : (
                            <img src="https://img.icons8.com/ios/50/null/user-male-circle--v1.png" alt="Profile Pic"/>
                          )}
                        </div>
                        <div className="dropdown-chevron">
                          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {!authorized && (
                  <div className="login-section" onClick={handleGoogleLogin}>
                    <div className="box-signin">
                      <button className="login-button" disabled={loading}>
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
        <nav className="xl:hidden">
          <div className="mobile-nav">
            <div className="flex items-center">
              <button className="mobile-menu-button" onClick={onMobileMenuToggle}>
                {showMobileMenu ? (
                  <div className="filler"></div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1={4} y1={6} x2={20} y2={6} />
                    <line x1={4} y1={12} x2={20} y2={12} />
                    <line x1={4} y1={18} x2={20} y2={18} />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          <div className={`mobile-menu-panel ${showMobileMenu ? 'visible' : 'hidden'}`}>
            <div className="mobile-menu-overlay" onClick={onMobileMenuToggle} />
            <div className="mobile-menu-header">
              <div className="mobile-menu-content">
                <div>
                  <div className="mobile-logo-section">
                    <div className="mobile-logo-container">
                      <Link to="/" onClick={onMobileMenuToggle} className="mobile-logo-link">
                        <img src="https://img.icons8.com/clouds/70/000000/code.png" alt="logo" />
                        <p className="mobile-logo-text">PROSHARE</p>
                      </Link>
                    </div>
                    <button className="mobile-close-button" onClick={onMobileMenuToggle}>
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1={18} y1={6} x2={6} y2={18} />
                        <line x1={6} y1={6} x2={18} y2={18} />
                      </svg>
                    </button>
                  </div>
                  
                  <ul className="mobile-nav-links">
                    {authorized && (
                      <li className="mobile-nav-item">
                        <Link to="/accounts" className="mobile-nav-link" onClick={onMobileMenuToggle}>
                          <div className="mobile-nav-content">
                            <div className="mobile-nav-icon">
                              <img className="w-7 h-7" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg4.svg" alt="dashboard" />
                            </div>
                            <p className="mobile-nav-text">Dashboard</p>
                          </div>
                        </Link>
                      </li>
                    )}
                    
                    <li className="mobile-nav-item">
                      <Link to="/ide" className="mobile-nav-link" onClick={onMobileMenuToggle}>
                        <div className="mobile-nav-content">
                          <div className="mobile-nav-icon">
                            <img className="w-7 h-7" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg5.svg" alt="products" />
                          </div>
                          <p className="mobile-nav-text">Test</p>
                        </div>
                      </Link>
                    </li>
                    
                    <li className="mobile-nav-item">
                      <Link to="/search" onClick={onMobileMenuToggle} className="mobile-nav-link">
                        <div className="mobile-nav-content">
                          <div className="mobile-nav-icon">
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                              <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z"/>
                            </svg>
                          </div>
                          <p className="mobile-nav-text">Search</p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
                
                {authorized ? (
                  <div className="mobile-user-section">
                    <div className="mobile-logout" onClick={onLogout}>
                      <div className="mobile-logout-content">
                        <img src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/96/null/external-smartphone-with-logout-option-with-sign-off-arrow-development-shadow-tal-revivo.png" alt="Logout Icon"/>
                        <span>Logout</span>
                      </div>
                    </div>
                    <div className="mobile-user-info">
                      <div className="mobile-user-details">
                        {user.profilePicture ? (
                          <img src={user.profilePicture} alt="profile" className="mobile-user-avatar" />
                        ) : (
                          <img src="https://img.icons8.com/ios/50/null/user-male-circle--v1.png" alt="ProfilePic" className="mobile-user-avatar"/>
                        )}
                        <p className="mobile-user-name">{user.name}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mobile-login">
                    <button 
                      className="mobile-login-button" 
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
        </nav>  
      </div>
      
      {/* Profile Picture Modal */}
      {showProfilePictureModal && (
        <div className="modal">
          <div onClick={onProfilePictureModalToggle} className="overlay"></div>
          <div className="modal-content">
            <div className="profile-modal-content">
              <div className="profile-modal-title">Enter the link address of the picture</div>
              <input 
                onChange={fileViewer} 
                value={profilePic.profilePicture}
                className="profile-modal-input"
                placeholder="https://..."
              />
              <div className="profile-modal-actions">
                <button 
                  onClick={fileUploader} 
                  className="profile-modal-submit"
                  disabled={!profilePic.profilePicture.trim()}
                >
                  Submit Picture
                </button>
              </div>
              <button onClick={onProfilePictureModalToggle} className="profile-modal-cancel">
                Cancel
              </button>
            </div>
          </div>             
        </div>
      )}
    </div>
  );
}

export default Header;
