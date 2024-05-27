import React from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { Fade } from "@mui/material";

export default function TooltipCustom({ children, title }) {
  return (
    <Tooltip
      title={title}
      TransitionComponent={Fade}
      disableInteractive
      enterDelay={350} 
      leaveDelay={20}
      slotProps={{
        popper: {
          sx: {
            [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
              {
                marginTop: "4px",
              },
            [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
              {
                marginBottom: "4px",
              },
            [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
              {
                marginLeft: "4px",
              },
            [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
              {
                marginRight: "4px",
              },
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
}
