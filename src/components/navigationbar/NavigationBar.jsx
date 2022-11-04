import React, { useEffect, useState } from "react";
import { MainTitle, NavAccountSpan, NavBar, NavSearchInput, NavIconsContainer, NavSearchbar, NavSearchButton, SubTitle, TitleWrap } from '../../styledComponents';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllCookie, getCookie, removeCookie } from "../../config/cookie";

const NavigationBar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const location = useLocation().pathname;

  useEffect(() => {
    if(getCookie('user_id')){
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [getCookie('user_id')])

  const navigate = useNavigate();
  const goProfile = () => {
    navigate(`/profile/${getCookie('user_id')}`);
  };

  const goMain = () => {
    navigate("/main");
  };
  const goLogin = () => {
    navigate('/login');
  }
  const goRegister = () => {
    navigate('/');
  }
  const goLogout = () => {
    const keys = Object.keys(getAllCookie());
    for(let i=0; i<keys.length; i++){
      if(keys[i] !== 'csrftoken'){
        removeCookie(keys[i]);
      }
    }
    

    setTimeout(() => {
      window.location.replace('/login')
    }, 500);
    
  }

  if (location === "/" || location === "/login") {
    return <></>;
  }

  return (
    <>

      <NavBar>
        <TitleWrap onClick={goMain}>
          <MainTitle href="#">
            뎁스
          </MainTitle>
          <SubTitle href="#">
            devStory
          </SubTitle>
        </TitleWrap>

        <NavSearchbar>
          <NavSearchInput type='text' placeholder="Search"></NavSearchInput>
          <NavSearchButton>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
          </NavSearchButton>
        </NavSearchbar>

        
        
    

        {isLogin ? (
          <NavIconsContainer>
            <span class="nav-icon material-symbols-outlined">notifications</span>
            <span class="nav-icon material-symbols-outlined">home</span>
            <span class="nav-icon material-symbols-outlined">settings</span>

            <img
              className="profile-pic"
              // src={require("./search/profile-img.png")}
              src={getCookie('user_img')}
              onClick={goProfile}
            />

            <NavAccountSpan>로그아웃</NavAccountSpan>
          </NavIconsContainer>
        ) : (
          <NavIconsContainer >
            <NavAccountSpan onClick={goLogin}>로그인</NavAccountSpan>
            <NavAccountSpan onClick={goRegister}>회원가입</NavAccountSpan>
          </NavIconsContainer>
        )}

      </NavBar>

    </>
  );
};

export default React.memo(NavigationBar);