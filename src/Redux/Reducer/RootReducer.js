import pages from "../State";
import { combineReducers } from "redux";


function PageReducer (state = pages , action){
  let temp = {...state};
  let e = action?.e;

  let id = action?.id?.split(".")
  id?.shift()
  id = id?.map(Number)

  let ind  = action?.ind;        
  
  let pageParent = temp;
  for(let i = 0; i < id?.length-1; i++){
    pageParent = pageParent?.subPages[id[i]]
  };
  
  let page = pageParent.subPages[ind]

    switch (action.type) {
      case "addElement":
        page.subPages.push({
          name:"New Page",
          showSubPages:true,
          pageBlocks:[],
          subPages:[],
        })
        break;
      case "addParentElement":
        pageParent.subPages.push({
          name:"New Page",
          showSubPages:true,
          pageBlocks:[],
          subPages:[],
        })
        break;
      case "hideElement":
        page.showSubPages = false;
        break;

      case "showElement":
        page.showSubPages = true;
        break;

      case "delElement":
        
        pageParent.subPages.splice(ind,1)
        
        break;
        
      case "changeName":
        page.name = action.text
        break;
      
      case "changeBlockName":
        page.pageBlocks[action.blockIndex].name = action.text
        break;

      case "addBlock":
        page.pageBlocks.push(
          {
            name:"New Block"
          }
        )
        break;
      
      case "deleteBlock":
        page.pageBlocks.splice(action.blockIndex,1)
          break;
////////////////////////// DRAG AND DROP ////////////////////////////////////////

      case "dragOverHandler":
        e.preventDefault();
        if(e.target.className.split(" ").includes("block-name")){
          e.target.style.boxShadow = "0px 4px 3px rgba(0, 117, 255, 1)"
        }
        break;

      case "dragLeaveHandler":
        e.target.style.boxShadow = "none";
        break;

      case "dragEndHandler":
        e.target.style.boxShadow = "none"
        break;

      case "dragStartHandler":
        temp.currentBlockIndex = action.blockIndex
        temp.currentId = action.id
        temp.currentPageIndex = action.pageIndex
        temp.currentElm = action.elm
        break;
      
      case "dropHandler":
        e.preventDefault();
        let currentId = temp?.currentId?.split(".")
        currentId?.shift()
        currentId = currentId?.map(Number)
            
        let currentPage = temp;
        for(let i = 0; i < currentId?.length; i++){
          currentPage = currentPage?.subPages[currentId[i]]
        };
        
        let dropId = action?.dropId?.split(".")
        dropId?.shift()
        dropId = dropId?.map(Number)
            
        let dropPage = temp;
        for(let i = 0; i < dropId?.length; i++){
          dropPage = dropPage?.subPages[dropId[i]]
        };
        currentPage.pageBlocks.splice(temp.currentBlockIndex,1)
        dropPage.pageBlocks.splice(action.dropBlockIndex + 1, 0 ,temp.currentElm)

        e.target.style.boxShadow = "none"
        break;
                   
      case "pageDropHandler":
        e.preventDefault();
        let currentIdBoard = temp?.currentId?.split(".")
        currentIdBoard?.shift()
        currentIdBoard = currentIdBoard?.map(Number)
            
        let currentPageBoard = temp;
        for(let i = 0; i < currentIdBoard?.length; i++){
          currentPageBoard = currentPageBoard?.subPages[currentIdBoard[i]]
        };


        let dropIdBoard = action?.dropId?.split(".")
        dropIdBoard?.shift()
        dropIdBoard = dropIdBoard?.map(Number)
            
        let dropPageBoard = temp;
        for(let i = 0; i < dropIdBoard?.length; i++){
          dropPageBoard = dropPageBoard?.subPages[dropIdBoard[i]]
        };
        
        if(dropPageBoard.pageBlocks.length === 0){
          currentPageBoard.pageBlocks.splice(temp.currentBlockIndex,1)
          dropPageBoard.pageBlocks.push(temp.currentElm)
        }
        break;
      
      default:
        temp.activePage = action.elm;
        break;
    }
  
  
  return temp;
};



const RootReducer = combineReducers({state:PageReducer});

export default RootReducer;