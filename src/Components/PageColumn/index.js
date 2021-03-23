import React, { useEffect } from "react";
import PageBody from "../PageBody";
import classNames from "classnames";
import {setActivePage} from "../../Redux/Action"
import { useDispatch } from "react-redux";


function PageColumn (props) {
  const {page,ind,pageParent,id} = props;
  const subpages = page.subPages;
  
  
  const dispatch = useDispatch();
  const length = pageParent?.length;
  

  const setAction = () => dispatch(setActivePage(null));

  useEffect(() => {
    document.addEventListener("click", setAction);
    return () => {
      document.removeEventListener("click", setAction);
    };
  });

  return(
    <div className = {classNames("page-column",{rowLine:(ind !== 0 && ind !== length - 1 && length)})}>

      <>
        <div className = {classNames(
          {
            none:(length === 0),
            oneChild:(length === 1),
            rowLeftChild:(ind < length/2 && length !== 1),
            rowRightChild:(ind >= length/2 && length !== 1),
          })}
        >
          <div/><div/>
        </div>
          <PageBody
            id = {id}
            page = {page}
            pageParent = {pageParent}
            ind = {ind}
        />
        <div className = {classNames(
        {
          none:(page.subPages.length === 0),
          oneChild:(page.subPages.length === 1 && page.showSubPages),
          manyChild:(page.subPages.length > 1 && page.showSubPages),
        })}
        >
        <div/><div/>
        </div>
      </>
      
      <div className = "page-subpage">
        { 
          page.showSubPages?
            subpages.map((elm,ind)=>{
              return (
                <PageColumn
                  ind = {ind}
                  page = {elm}
                  pageParent = {subpages}

                  key = {ind}
                  id = {id + "." + ind}
                />
              )
            })
          :
            <div/>
        }      
      </div>
    </div>
  );
};

export default PageColumn;