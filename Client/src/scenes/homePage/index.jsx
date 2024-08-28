import { useSelector } from "react-redux";
import UserWidget from "../../scenes/widgets/UserWidget.jsx";
import Navbar from "../navbar/index.jsx";
import { Box, useMediaQuery } from "@mui/material";
import MyPostWidget from "../widgets/MyPostWidget.jsx";
import PostsWidget from "../../scenes/widgets/PostsWidget.jsx";
import AdvertWidget from "../../scenes/widgets/AdvertWidget.jsx";
import FriendListWidget from "../../scenes/widgets/FriendListWidget.jsx";


const HomePage=()=>{
    const isNonMobileScreens=useMediaQuery("(min-width:1000px)");
    const {_id,picturePath}=useSelector((state)=>state.user);
    return(
        <Box marginTop="4rem">
            <Navbar/>
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens?"flex":"block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens?"26%":undefined}>
                    <Box position="sticky" top="6rem">
                    <UserWidget userId={_id} picturePath={picturePath}/>
                    </Box>
                </Box>
                <Box 
                    flexBasis={isNonMobileScreens?"42%":undefined}
                    marginTop={isNonMobileScreens?undefined:"2rem"}
                >
                    <MyPostWidget picturePath={picturePath}/>
                    <PostsWidget userId={_id}/>
                </Box>

                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                        <AdvertWidget/>
                        <Box margin="2rem 0"/>
                        <FriendListWidget userId={_id}/>
                    </Box>
                )}

            </Box>
        </Box>
    )
}

export default HomePage;