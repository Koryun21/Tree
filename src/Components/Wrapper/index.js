import React from "react";
import PageColumn from "../PageColumn";
import "./styles.scss";
import "./lineStyle.scss";
import { connect, useSelector } from "react-redux";


function Wrapper () {
  const page = useSelector((state) => state.state)
  // console.log(page,"page in wrapper")

  return (
    <div id = "wrapper">
      <PageColumn
        page = {page}
        id = ""
      />
    </div>
  )
}

export default connect(r=>r)(Wrapper);