import { Box,Typography,useTheme,useMediaQuery } from "@mui/material"
import Form from "./Form";

export default function LoginPage(){
    const theme=useTheme();
    const isNonMobileScreens=useMediaQuery("(min-width:1000px)");
    return(
        <Box>
            <Box width="100%" backgroundColor={theme.palette.background.alt} padding="1rem 6%" textAlign="center">
                <Typography color="primary" fontWeight="bold" fontSize="32px">
                    Sociopedia
                </Typography>
            </Box>

            <Box
                width={isNonMobileScreens?"50%":"93%"}
                padding="2rem"
                margin="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography fontWeight="500" variant="h5" sx={{marginBottom:"1.5rem"}}>
                    Welcome  to Sociopedia, the Social Media for Sociopaths!
                </Typography>
                <Form/>
            </Box>
        </Box>
    )
}