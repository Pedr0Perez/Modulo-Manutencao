import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function CardLogin({ children }) {
  return (
    <Card sx={{ minWidth: 275, padding: "1.3rem" }} variant="outlined">
      <CardContent>{children}</CardContent>
    </Card>
  );
}
