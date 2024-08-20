'use client'
import Image from "next/image";
import getStripe from '@/utils/get-stripe'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import Head from "next/head";
import './globals.css';
import { Inter, Quicksand } from "@next/font/google";
import Navbar from './navbar.js'
import { useRouter } from 'next/navigation'




const inter = Inter({
  subsets: ["latin"],
});

export default function Home() {

  const router = useRouter()

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        //Change when in production
        origin: 'http://localhost:3000'

      }
    })


    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return

    }

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.log(error.message)
    }


  }

  return (
    //Supposed to take the whole screen
    <Container sx={{ backgroundImage: "linear-gradient(180deg,#f1f6ff,#e8f1ff 40%,#e6e8ff 50%,#e3edff 60%,#fff)", minHeight: "100vh", minWidth: "100vw" }} maxWidth={false} className={inter}>


      <Head>

        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>
      <Navbar></Navbar>

      <Container>
        <Container >
          <Box sx={{ textAlign: 'center', mt: 10, mb: 0, ml: "auto", mr: "auto", width: "500px" }}>
            {/*Professional-grade Memory Recall with AI Flashcards*/}
            <Typography variant="h2" gutterBottom sx={{
              fontWeight: "600",
              lineHeight: "1.2",
              fontFamily: "inherit",
              mb: 0
            }}>Master Your Knowledge with AI-Driven Flashcards</Typography>
            <Typography variant="h5" gutterBottom sx={{
              fontFamily: "inherit",
              mt: 5
            }}> {' '} Create quality flash cards quickly and easily</Typography>
            <Button variant="contained" sx={{ background: "linear-gradient(90deg, #3B82F6, #60A5FA)", mt: 10, fontSize: "1rem", fontFamily: "inherit", borderRadius: "20px" }} onClick={() => {
              router.push('/pricing')
            }}>
              Get Started
            </Button>
          </Box>
        </Container>

        {/* <Box sx={{ my: 6 }}>
          <Typography variant="h4" gutterBottom>
            Features
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>Easy TExt Input</Typography>
              <Typography>
                {''}
                Simply Input your text and let our software do the rest. Creating falshacards has never been easier
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>Easy TExt Input</Typography>
              <Typography>
                {''}
                Simply Input your text and let our software do the rest. Creating falshacards has never been easier
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>Easy TExt Input</Typography>
              <Typography>
                {''}
                Simply Input your text and let our software do the rest. Creating falshacards has never been easier
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: 6, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>  Pricing </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: '2',
                bgcolor: "white"

              }}
              >
                <Typography variant="h5" gutterBottom>Basic</Typography>
                <Typography variant="h6" gutterBottom>5$ / month</Typography>
                <Typography>
                  {''}
                  Access to basic flashcard features and limited storage.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Choose basic
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: '2',
                bgcolor: "white"
              }}
              >
                <Typography variant="h5" gutterBottom>Pro</Typography>
                <Typography variant="h6" gutterBottom>10$ / month</Typography>
                <Typography>
                  {''}
                  Unlimited flashcards and storage. Priority consideration.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
                  Choose Pro
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box> */}
      </Container>
    </Container >
  )
}
