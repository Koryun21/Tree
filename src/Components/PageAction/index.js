import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageAction , deleteElement} from "../../Redux/Action";

function PageAction (props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.state);
  const {actionType,page,length,ind,id} = props;
  const activePage = useSelector((state) => state.state.activePage);

  
  return(
    <>
      {
        !(
          activePage === page &&
          actionType() === "add"
        )?
        <div
          className = {"page-action showBtn " +  actionType() + "Background"}
          onClick = {(e) => {e.stopPropagation();dispatch(pageAction(actionType(),id,ind))}}
        />:<div/>
      }
      {
        length === 1 ||
        (length > 1 && ind === 0) ||
        (length > 1 && ind === length - 1)
        ?
          <div 
            onClick = {(e) => {e.stopPropagation();dispatch(pageAction("addParent",id,ind))}}
            className = "page-action addBtn addBackground"
          />
        : <div/>
      }
      {
        activePage === page?
          <div 
            className = "deleteBtn deleteBackground"
            onClick = {(e) => {
              e.stopPropagation();dispatch(deleteElement(id,state,ind))
              }}
          />
        :<div/>
      }
    </>
  );
};

export default PageAction