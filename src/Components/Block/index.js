import React from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { changeBlockName, blockAction, dragOverHandler, dragLeaveHandler, dragEndHandler, dropHandler,dragStartHandler} from "../../Redux/Action";

function Block (props) {
  const {elm,page,blockIndex,pageIndex,id} = props;
  const state = useSelector(state => state.state)
    
  const dispatch = useDispatch();

  return (
        <div 
          onDragOver = {(e) => dispatch(dragOverHandler(e))}
          onDragLeave = {(e) => dispatch(dragLeaveHandler(e))}
          onDragStart = {() => dispatch(dragStartHandler(pageIndex,id,blockIndex,elm))}
          onDragEnd = {(e) => dispatch(dragEndHandler(e))}
          onDrop = {
            (e) => dispatch(dropHandler(
              e,
              blockIndex,
              id,
              pageIndex,
            ))
          }
          draggable = {true}
          className = "block"
        >
          <input
            value = {elm.name}
            onChange = {(e) => {dispatch(changeBlockName(id,pageIndex,blockIndex,e.target.value))}}
            className = {classNames("block-name",{active:(state.activePage === page)})}
          />
          {
            state.activePage === page?
              <div 
                className = "block-action"
                onClick = {() => {dispatch(blockAction("delete",id,pageIndex,blockIndex))}}
              />
            :<div/>
          }
        </div>

      
  )
}

export default Block;