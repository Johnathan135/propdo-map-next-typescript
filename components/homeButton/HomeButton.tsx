import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";

const HomeButton = () => {
  return (
    <Link href="/Mappy">
      <Button variant="contained" sx={{ marginTop: 3 }}>
        Home
      </Button>
    </Link>
  );
};

export default HomeButton;
