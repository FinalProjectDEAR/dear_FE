import React, { Component } from "react";
import OpenViduAudioComponent from "./OvVideo";

import styled from "styled-components";
import { Text, Button, ColorBadge } from "../elements";

function UserAudioComponent(props) {
  console.log(props);
  const clientData = props.streamManager.stream.connection.data;
  const name = clientData.split("%")[2];
  console.log(name);

  return (
    <div>
      {props.streamManager !== undefined ? (
        <div>
          <OpenViduAudioComponent streamManager={props.streamManager} />
          <div>
            <p>{name}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserAudioComponent;
