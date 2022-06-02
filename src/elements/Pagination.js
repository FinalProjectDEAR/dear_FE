import * as React from "react";
import Pagination from "@mui/material/Pagination";
import styled from "styled-components";
import { red } from "@mui/material/colors";

export default function Paginations(props) {
  // console.log(props);
  return (
    <Page>
      <Pagination
        count={props.totalPage}
        onChange={(e, page) => props.setPage(page)}
        // sx={{
        //   background: "red",
        // }}
        // page={page}
        shape="rounded"
      />
    </Page>
    // <Stack spacing={2}>
    //   <Pagination count={props.totalPage} shape="rounded" />
    // </Stack>
  );
}

const Page = styled.div`
text-align: center;
 .MuiSpeedDial-fab {
  background: yellow;
  box-shadow: none;

  /* :hover {
    background: #61586a;
  } */
 `;
