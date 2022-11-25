import React, { memo, useState } from "react";
import { APIURL } from "../../../config/key";
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
const MyFanPopup = memo(({ setPopup, fans, goUserProfile }) => {
  return (
    <>
      <PopupDiv>
        <PopupBox>
          <PopupHeader setPopup={setPopup} text="FAN" />

          {fans.length === 0 ? (
            <EmptyFanIdol>No Fan</EmptyFanIdol>
          ) : (
            <>
              {fans.map((data, idx) => (
                <>
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
                </>
              ))}
            </>
          )}
        </PopupBox>
      </PopupDiv>
    </>
  );
});

export default MyFanPopup;
