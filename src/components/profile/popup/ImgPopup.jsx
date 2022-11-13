import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { memo, useState, useEffect } from "react";
import { getCookie, setCookie } from "../../../config/cookie";
import { APIURL } from "../../../config/key";
import {
  PopupBox,
  PopupDiv,
  ImageUploadBtn,
  ImageBox,
  Image,
  ImageInputDiv,
  ImageInput,
  PopupSaveBtn,
  ImageIconStyle,
  EditProfileDiv,
  EditLabel,
  EditInput,
} from "../../../styledComponents";
import PopupHeader from "./PopupHeader";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ImgPopup = memo(({ setPopup, name, email, id }) => {
  const [src, setSrc] = useState(getCookie("user_img"));
  const [inputs, setInputs] = useState({
    _name: name,
    _email: email,
  });
  const { _name, _email } = inputs;

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setSrc(reader.result);
      });
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const editInfo = async () => {
    const body = {
      email: _email,
      name: _name,
      image: src,
    };
    const res = await axios.patch(`${APIURL}/account/user/${id}/`, {
      headers: {
        Authorization: "token " + getCookie("token"),
      },
      body: body,
    });

    if (res.status == 200) {
      console.log(res);
      setPopup(false);
      window.location.reload();
    } else {
      console.log("edit info fail");
    }
  };

  return (
    <>
      <PopupDiv>
        <PopupBox>
          <PopupHeader setPopup={setPopup} text="프로필 정보 수정" />

          <ImageBox>
            {src === "null" || src === "undefined" ? (
              <FontAwesomeIcon icon={faUser} style={ImageIconStyle} />
            ) : (
              <Image src={src} />
            )}
          </ImageBox>

          <ImageInputDiv>
            <ImageInput type="file" onChange={onSelectFile} />
          </ImageInputDiv>

          <EditProfileDiv>
            <EditLabel>이름</EditLabel>
            <EditInput
              type="text"
              name="_name"
              value={_name}
              onChange={onChange}
            />
          </EditProfileDiv>

          {/* <EditProfileDiv>
            <EditLabel>아이디</EditLabel>
            <EditInput type="text" name="_id" value={_id} onChange={onChange} />
          </EditProfileDiv> */}

          <EditProfileDiv style={{ marginBottom: "50px" }}>
            <EditLabel>이메일</EditLabel>
            <EditInput
              type="text"
              name="_email"
              value={_email}
              onChange={onChange}
            />
          </EditProfileDiv>

          <PopupSaveBtn onClick={editInfo}>저장하기</PopupSaveBtn>
        </PopupBox>
      </PopupDiv>
    </>
  );
});

export default ImgPopup;
