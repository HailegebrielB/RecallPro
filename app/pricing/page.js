'use client'
import { Box, Button, Card, CardContent, CardHeader, Container, Grid, Icon, List, ListItem, Stack, Typography } from "@mui/material";
import Navbar from "../navbar";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import '../globals.css'
import getStripe from '@/utils/get-stripe'

export default function Pricing() {

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

    return (<Container maxWidth={false} sx={{ backgroundImage: "linear-gradient(180deg,#f1f6ff,#e8f1ff 40%,#e6e8ff 50%,#e3edff 60%,#fff)", minHeight: "100vh", minWidth: "100vw" }}>
        <Navbar></Navbar>
        <Container>
            <Box width="650px" ml="auto" mr="auto" my={10}>
                <Typography variant="h2" gutterBottom sx={{
                    fontWeight: "600",
                    lineHeight: "1.2",
                    fontFamily: "inherit",
                    mb: 0
                }}>Invest in Knowledge Unlock Your Potential</Typography>
            </Box>

        </Container>

        <Container>
            <Grid container spacing={10}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h4">Standard</Typography>
                                <Typography variant="h4">5$/month</Typography>

                            </Box>



                            <List>
                                <ListItem sx={{
                                    display: "flex", justifyContent: "space-between"
                                }}>
                                    <Typography varaint="h3"><span className="bold">Create Flashcards:</span> Make your own flashcards.</Typography>
                                    <CheckBox />
                                </ListItem>
                                <ListItem sx={{
                                    display: "flex", justifyContent: "space-between"
                                }}>
                                    <Typography varaint="h3"><span className="bold">Save Flashcards:</span> Store your cards online to have them accessible from anywhere</Typography>
                                    <CheckBox />
                                </ListItem>
                                <ListItem sx={{
                                    display: "flex", justifyContent: "space-between"
                                }}>
                                    <Typography varaint="h3"><span className="bold">AI Generation:</span> Have AI generate cards for you.</Typography>
                                    <CheckBox />
                                </ListItem>
                                <ListItem sx={{
                                    display: "flex", justifyContent: "space-between"
                                }}>
                                    <Typography varaint="h3"><span className="bold">Detailed Progress Tracking:</span> Dive deeper into your learning stats.</Typography>
                                    <CheckBoxOutlineBlank />
                                </ListItem>
                                <ListItem sx={{
                                    display: "flex", justifyContent: "space-between"
                                }}>
                                    <Typography varaint="h3"><span className="bold">Unlimited Flashcards: </span>Create as many flashcards as you want.</Typography>
                                    <CheckBoxOutlineBlank />
                                </ListItem>

                            </List>
                            <Container sx={{ textAlign: "center", mt: 5, display: "flex", justifyContent: "center" }}>

                                <Button variant="contained" sx={{ fontSize: "1.125rem" }} onClick={handleSubmit}>Buy</Button>
                            </Container>



                        </CardContent>

                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent sx={{
                            backgroundColor: "#8BC6EC",
                            backgroundImage: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)"

                        }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h4">Premium</Typography>
                                <Typography variant="h4">10$/month</Typography>

                            </Box>



                            <List>
                                <ListItem sx={{
                                    display: "flex", justifyContent: "space-between"
                                }}>
                                    <Typography varaint="h3"><span className="bold">Create Flashcards:</span> Make your own flashcards.</Typography>
                                    <CheckBox />
                                </ListItem>
                                <ListItem sx={{
                                    display: "flex", justifyContent: "space-between"
                                }}>
                                    <Typography varaint="h3"><span className="bold">Save Flashcards:</span> Store your cards online to have them accessible from anywhere</Typography>
                                    <CheckBox />
                                </ListItem>
                                <ListItem sx={{
                                    display: "flex", justifyContent: "space-between"
                                }}>
                                    <Typography varaint="h3"><span className="bold">AI Generation:</span> Have AI generate cards for you.</Typography>
                                    <CheckBox />
                                </ListItem>
                                <ListItem sx={{
                                    display: "flex", justifyContent: "space-between"
                                }}>
                                    <Typography varaint="h3"><span className="bold">Detailed Progress Tracking:</span> Dive deeper into your learning stats.</Typography>
                                    <CheckBox />
                                </ListItem>
                                <ListItem sx={{
                                    display: "flex", justifyContent: "space-between"
                                }}>
                                    <Typography varaint="h3"><span className="bold">Unlimited Flashcards: </span>Create as many flashcards as you want.</Typography>
                                    <CheckBox />
                                </ListItem>

                            </List>
                            <Container sx={{ textAlign: "center", mt: 5, display: "flex", justifyContent: "center" }}>

                                <Button variant="contained" sx={{ background: "linear-gradient(90deg, #3B82F6, #60A5FA)", fontSize: "1.125rem" }} >Buy</Button>
                            </Container>



                        </CardContent>

                    </Card>
                </Grid>
            </Grid>
        </Container >

    </Container >)
}