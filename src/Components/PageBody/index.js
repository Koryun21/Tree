import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { blockAction, changeName, setActivePage, dragOverHandler, pageDropHandler} from "../../Redux/Action";
import classNames from "classnames";
import PageAction from "../PageAction";
import Block from "../Block"


function PageBody (props) {
  const activePage = useSelector((state) => state.state.activePage)
  const dispatch = useDispatch();
  const {page,pageParent,ind,id} = props;
  const length = pageParent?.length;

  const actionType = () => {
    if(page?.subPages.length === 0){
      return "add";
    }
    else if (page?.subPages.length > 0 && page?.showSubPages){
      return "hide";
    }
    else if (page?.subPages.length > 0 && !page?.showSubPages){
      return "show";
    }
  }

  return(  
    <div className = "page"
      onDragOver = {(e) => dispatch(dragOverHandler(e))}
      onDrop = {(e) => {dispatch(pageDropHandler(e,id))}}
    >
      <div className = {classNames(
        {
          none:(length === 0),
          oneChild:(length === 1),
          leftChild:(ind < length/2 && length !== 1),
          rightChild:(ind >= length/2 && length !== 1),
        })}
      >
        <div/><div/>
      </div>
      <div
        onClick = {(e) => {e.stopPropagation();dispatch(setActivePage(page))}}
        className = {
            classNames("page-body",
              {active:(activePage === page)},
              {show:(actionType() === "show")}
            )}
      >
        <input
          value = {page.name}
          onChange = {(e) => {dispatch(changeName(id,ind,e.target.value))}}
          className = "page-name-input"
        />
        <div className = "page-block">
          {
            page?.pageBlocks.map((elm,blockIndex)=>{
              return(
                <Block
                  elm = {elm}
                  pageIndex = {ind}
                  blockIndex = {blockIndex}
                  key = {blockIndex}
                  id = {id}
                  page = {page}
                />
              )
            })
          }
          {
            activePage === page?
                <div 
                  onClick = {() => {dispatch(blockAction("add",id,ind))}}
                  className = "add-block">
                  +
                </div>
            :<div/>
          }
        </div>
        <PageAction
          page = {page}
          ind = {ind}
          id = {id}
          length = {length}
          actionType = {actionType}
        />
        {
          (actionType() === "show")?
            <div className = "shadow">
              <div/>
            </div>
          :<div/>
        }
      </div>
    </div>
  );


};

export default connect(r=>r)(PageBody);