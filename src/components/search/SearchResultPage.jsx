import React, { useEffect, useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faHouse, faBell, faGear} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllCookie, getCookie, removeCookie } from "../../config/cookie";
import { APIURL } from '../../config/key';
import axios from 'axios';
import ProfileCard from './ProfileCard';
import AdCard from './AdCard';
import SearchResultCard from './SearchResultCard';
import RecommendBar from './RecommendBar';
const SearchResultPage = () => {
  const location = useLocation()
  console.log('location',location)
  return (
    <>
        <RecommendBar></RecommendBar>

        {/* {searched_list && <SearchResultCard id = {searched_list[0]}></SearchResultCard>} */}

        <SearchResultCard></SearchResultCard>
        


    </>
  );
};

export default React.memo(SearchResultPage);