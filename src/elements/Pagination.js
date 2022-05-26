import * as React from "react";
import Pagination from "@mui/material/Pagination";

export default function Paginations(props) {
  // console.log(props);
  return (
    <div style={{ textAlign: "center" }}>
      <Pagination
        count={props.totalPage}
        onChange={(e, page) => props.setPage(page)}
        // page={page}
        shape="rounded"
      />
    </div>
    // <Stack spacing={2}>
    //   <Pagination count={props.totalPage} shape="rounded" />
    // </Stack>
  );
}
