import { Container, AppBar, Toolbar, Typography, Button, Box, Stack } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useRouter } from "next/navigation";

export default function Navbar() {

    const router = useRouter()

    return (
        <Container maxWidth="xl">
            <AppBar position="static" sx={{ background: "transparent", boxShadow: "none", color: "black" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>

                        <Button color="inherit" sx={{ fontSize: "1.25rem" }} onClick={() => { router.push('/') }}>Recall Pro</Button>
                        <SignedOut>
                            <Stack direction="row" spacing={4}>
                                <Button color="inherit" href="/sign-in">Login</Button>
                                <Button color="inherit" href="/sign-up">Sign Up</Button>
                            </Stack>
                        </SignedOut>
                        <SignedIn>
                            <Stack direction="row" spacing={4}>
                                <Button color="inherit" onClick={() => { router.push('/generate') }}>Generate</Button>
                                <Button color="inherit" onClick={() => { router.push('/flashcards') }}>Flashcards</Button>
                            </Stack>
                            <UserButton />

                        </SignedIn>
                    </Toolbar>
                </Container>
            </AppBar>
        </Container>
    )
}