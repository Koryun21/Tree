export function setActivePage (elm) {
  return{
    type:"setActivePage",
    elm
  }
}

export function pageAction (type,id,ind){
  return{
    type: type + "Element",
    id,ind
  }
}

export function deleteElement (id,ind){
  return{
    type:"delElement",
    id,
    ind
  }
}

export function changeName (id,ind,text){
  return{
    type: "changeName",
    id,ind,
    text
  }
}
export function changeBlockName (id,ind,blockIndex,text){
  return{
    type: "changeBlockName",
    id,
    ind,
    blockIndex,
    text
  }
}

export function blockAction (type,id,ind,blockIndex) {
  return{
    type: type + "Block",
    id,ind,
    blockIndex
  }
}

////////////////// DRAG AND DROP ACTIONS //////////////////////////////

export function dragOverHandler (e) {
  return{
    type:"dragOverHandler",
    e
  }
}

export function dragLeaveHandler (e) {
  return{
    type:"dragLeaveHandler",
    e
  }
}

export function dragStartHandler (pageIndex,id,blockIndex,elm) {
  return{
    type:"dragStartHandler",
    pageIndex,id,blockIndex,elm
  }
}

export function dragEndHandler (e) {
  return{
    type:"dragEndHandler",
    e,
  }
}

export function dropHandler (e,dropBlockIndex,dropId,dropPageIndex) {
  return{
    type:"dropHandler",
    e,
    dropBlockIndex,
    dropId,
    dropPageIndex,
  }
}

export function pageDropHandler (e,dropId){
  return{
    type:"pageDropHandler",
    e,
    dropId,
  }
}