import { Box,Typography,useMediaQuery } from "@mui/material"
import { useEffect,useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Navbar from "../../scenes/navbar"
import FriendListWidget from "../../scenes/widgets/FriendListWidget"
import MyPostWidget from "../../scenes/widgets/MyPostWidget"
import UserWidget from "../../scenes/widgets/UserWidget"
import PostsWidget from "../../scenes/widgets/PostsWidget"

export default function ProfilePage(){
    const [user,setUser]=useState(false);
    const {userId}=useParams();
    const token=useSelector((state)=>state.token);
    const isNonMobileScreens=useMediaQuery("(min-width:1000px)");

    const getUser=async()=>{
        const response=await fetch(`https://sociopedia-socialmedia-server.onrender.com/users/${userId}`,
            {
                method:"GET",
                headers:{Authorization:`Bearer ${token}`}
            }
        )
        const data=await response.json();
        setUser(data);
    }

    useEffect(()=>{
        getUser();
    },[]);


    return(
        <Box marginTop="4rem">
            <Navbar/>
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens?"flex":"block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens?"26%":undefined}>
                    <UserWidget userId={userId} picturePath={user.picturePath}/>
                    <Box margin="2rem 0"/>
                    <FriendListWidget userId={userId}/>
                </Box>
                <Box 
                    flexBasis={isNonMobileScreens?"42%":undefined}
                    marginTop={isNonMobileScreens?undefined:"2rem"}
                >
                    <Typography variant="h3" fontWeight="500">{`${user.firstName} ${user.lastName}'s Posts`}</Typography>
                    <Box margin="2rem 0"/>
                    <PostsWidget userId={userId} isProfile/>
                </Box>
            </Box>
        </Box>
    )
}