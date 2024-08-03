"use client";

import { useRouter } from "next/navigation";

import { Box, Button, Typography } from "@mui/material";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: 15 }}
      >
        <Typography variant="h1" sx={{ fontFamily: "Georgia, monospace" }}>
          The Pantry App
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 6 }}
          onClick={() => router.push("/pantry")}
        >
          <Typography variant="body1">Get Started</Typography>
        </Button>
      </Box>
    </>
  );
}
