import React, { memo } from "react";
import {
  PopupBox,
  PopupDiv,
  CardUnit,
  CardUserName,
  CardUserDesc,
  CardImg,
  CardImgNameBox,
  EmptyFanIdol,
} from "../../../styledComponents";
import PopupHeader from "./PopupHeader";
import { APIURL } from "../../../config/key";

const MyIdolPopup = memo(({ setPopup, idols, goUserProfile }) => {
  return (
    <>
      <PopupDiv>
        <PopupBox>
          <PopupHeader setPopup={setPopup} text="IDOL" />

          {idols.length === 0 ? (
            <EmptyFanIdol>No Idol</EmptyFanIdol>
          ) : (
            <>
              {idols.map((data, idx) => (
                <CardUnit key={idx}>
                  <CardImgNameBox>
                    <CardImg
                      src={`${data.image}`}
                      onClick={(e) => goUserProfile(e, data.user)}
                    />
                    <CardUserName>{data.name}</CardUserName>
                  </CardImgNameBox>
                  {data.position != null && data.position != undefined && (
                    <CardUserDesc>{data.position}</CardUserDesc>
                  )}
                </CardUnit>
              ))}
            </>
          )}
        </PopupBox>
      </PopupDiv>
    </>
  );
});

export default MyIdolPopup;
