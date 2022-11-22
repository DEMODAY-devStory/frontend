import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser,faBell,faGear,faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllCookie, getCookie, removeCookie } from "../../config/cookie";
import { APIURL } from '../../config/key';
import axios from 'axios';
import { SearchResultDiv, SearchResultImg, SearchResultDetail, SearchResultIntroBox, SearchResultButton,SearchResultDivParent } from '../../styledComponents';


const SearchResultCard = ({id}) => {
  const [userInfo, setUserInfo] = useState({})
  const getUserInfo = async () => {
    const res = await axios.get(`${APIURL}/account/user/${id}`);
    if (res.status == 200) {
      // console.log("get user info: ", res.data);
      setUserInfo(res.data);
    } else {
      console.log("get user info fail");
    }
  };
  const [profile, setProfile] = useState({})
  const getProfile = async () => {
    const res = await axios.get(`${APIURL}/profile/profile/${id}/`)
    if (res.status == 200) {
      setProfile(res.data);
    } else {
      console.log("get profile fail");
    }
  };

  const onFollow = async () => {
    const follower = getCookie("user_id");

    if (!follower) {
      alert("로그인이 필요합니다!");
      return;
    }

    const res = await axios.post(`${APIURL}/profile/follow/`, {
      follower,
      following: userInfo.id,
    });

    if (res.status == 201) {
      alert("나의 아이돌에 추가되었습니다.");
    } else if (res.status == 204) {
      alert("나의 아이돌에서 삭제되었습니다.");
    }
  };
  

  useEffect(()=>{
  getUserInfo()
  getProfile()
  },[id])

  const navigate = useNavigate();
  const goProfile = () => {
    navigate(`/profile/${id}`);
  };

  return (
    <SearchResultDivParent>
      <SearchResultDiv onClick={goProfile}>
        <SearchResultImg src={userInfo.image}></SearchResultImg>         
        <SearchResultDetail>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <span style={{fontSize: '18px', fontWeight: '700'}}>{userInfo.name}</span>
            <span>
              <span style={{fontSize: '18px'}}>{profile.main_position == undefined ? <span></span> : profile.main_position}</span>
              <span style={{fontSize: '18px'}}>@ {profile.position == undefined ? <span></span> : profile.position}</span>
            </span>              
            <span style={{fontSize: '18px'}}>{profile.major == undefined ? <span></span> : profile.major}</span>
            </div>
        </SearchResultDetail>
        <SearchResultIntroBox>
          <p>
          {profile.introduction == undefined ? <span></span> : profile.introduction}
          </p>
        </SearchResultIntroBox>
      </SearchResultDiv>
      <SearchResultButton onClick={onFollow}>
          IDOL 등록
      </SearchResultButton>
    </SearchResultDivParent>
  );
};

export default React.memo(SearchResultCard);
