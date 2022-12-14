import React, { memo, useEffect, useState } from "react";
import {
  ProfileInfoDiv,
  ProfileFunctDiv,
  ProfileFunctWrap,
} from "../../styledComponents";
import ProfileImage from "./ProfileImage";
import ProfileText from "./ProfileText";
import ProfileFollow from "./ProfileFollow";
import ProfileTag from "./ProfileTag";
import ImgPopup from "./popup/ImgPopup";
import MyFanPopup from "./popup/MyFanPopup";
import MyIdolPopup from "./popup/MyIdolPopup";
import axios from "axios";
import { APIURL } from "../../config/key";
import { getCookie } from "../../config/cookie";
import { useParams } from "react-router-dom";

const ProfileInfo = memo(() => {
  //const id = getCookie('user_id');
  const params = useParams();
  const id = params.user_id;

  const [userInfo, setUserInfo] = useState({
    id: "",
    email: "",
    name: "",
    image: "",
    link: "",
  });
  const { email, name, image, link } = userInfo;

  const getUserInfo = async () => {
    const res = await axios.get(`${APIURL}/account/user/${id}`);

    if (res.status == 200) {
      setUserInfo(res.data);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [id]);

  return (
    <>
      <ProfileInfoDiv>
        <ProfileImage image={image} />

        <ProfileFunctWrap>
          <ProfileFunctDiv>
            <ProfileText
              name={name}
              id={id}
              email={email}
              link={link}
              image={image}
            />
            <ProfileFollow />
          </ProfileFunctDiv>
          <ProfileTag />
        </ProfileFunctWrap>
      </ProfileInfoDiv>
    </>
  );
});

export default ProfileInfo;
