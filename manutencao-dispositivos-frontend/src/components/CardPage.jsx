import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export default function CardPage({ titlePage, children }) {
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div">
          {titlePage}
        </Typography>
        <Divider component="p" className="mt-2 mb-3" />
        {children}
      </CardContent>
    </React.Fragment>
  );

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Card variant="outlined" sx={{ height: "inherit", width: "inherit" }}>
        {card}
      </Card>
    </Box>
  );
}
