'use client'
import { useUser } from '@clerk/nextjs'
import { use, useEffect, useState } from 'react'

import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useRouter } from 'next/navigation'
import { Card, CardActionArea, CardContent, Container, Grid, Typography } from '@mui/material'
import Navbar from '../navbar'

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || []
                setFlashcards(collections)
            } else {
                await setDoc(docRef, { flashcards: [] })
            }
        }
        getFlashcards()
    }, [user])

    if (!isLoaded && !isSignedIn) {
        return <></>
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    const stackEffect = () => {
        for (let i = 0; i < 3; i++) {

        }
    }

    return (<Container maxWidth="100vw" sx={{
        minHeight: "100vh", background: "#E5E7EB"
    }}>
        < Navbar />
        <Grid container spacing={3} px={5} sx={{
            mt: 4
        }}>

            {flashcards.map((flashcard, index) => {
                let cardWidth
                return (
                    <Grid item xs={12} sm={6} md={4} key={index} position="relative" zIndex="0">
                        <Card sx={{ position: "relative", zIndex: 1 }} >
                            <CardActionArea
                                onClick={() => {
                                    handleCardClick(flashcard.name)
                                }} sx={{ aspectRatio: "2/1" }}>
                                <CardContent>
                                    <Typography variant="h6" textAlign="center">{flashcard.name}</Typography>
                                </CardContent>


                            </CardActionArea>
                        </Card>

                        <Card sx={{ position: "absolute", top: 20, left: 20, zIndex: -1, width: "95%", height: "90%" }}>
                            <CardContent sx={{ width: "100%" }} />
                        </Card>
                        <Card sx={{ position: "absolute", top: 15, left: 15, zIndex: -2, width: "95%", height: "90%" }}>
                            <CardContent sx={{ width: "100%" }} />
                        </Card>
                        <Card sx={{ position: "absolute", top: 10, left: 10, zIndex: -3, width: "95%", height: "90%" }}>
                            <CardContent sx={{ width: "100%" }} />
                        </Card>


                    </Grid>

                )
            }
            )
            }


        </Grid>

    </Container >)
}