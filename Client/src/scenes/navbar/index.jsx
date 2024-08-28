import { useState } from "react"
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
  } from "@mui/material";
  import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close,
  } from "@mui/icons-material";
  import { useDispatch,useSelector } from "react-redux";
  import { setMode,setLogout } from "../../state";
  import { Navigate, useNavigate } from "react-router-dom";
  import FlexBetween from "../../components/FlexBetween";


export default function Navbar(){
    const [isMobileMenuToggled,setIsMobileMenuToggled]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=useSelector((state)=>state.user);
    const isNonMobileScreens=useMediaQuery("(min-width:1000px)")

    const theme=useTheme();
    const neutralLight=theme.palette.neutral.light;
    const dark=theme.palette.neutral.dark;
    const background=theme.palette.background.default;
    const primaryLight=theme.palette.primary.light;
    // const primaryDark=theme.palette.primary.dark;
    const alt=theme.palette.background.alt;

    const fullName=`${user.firstName} ${user.lastName}`;

    return(
        <FlexBetween padding="1rem 6%" backgroundColor={alt} position="fixed" top="0px" width="100%" zIndex="20" sx={{opacity:"90%"}}>
            <FlexBetween gap="1.75rem">
                <Typography color="primary" fontWeight="bold" fontSize="clamp(1rem,2rem,2.25rem)" onClick={()=>navigate("/home")} 
                sx={{
                    "&:hover":{
                        color:primaryLight,
                        cursor:"pointer",
                    },
                }}>
                    Sociopedia
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                        <InputBase placeholder="Search..."/>
                        <IconButton>
                            <Search/>
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>
            {/* DESKTOP NAV */}
            {isNonMobileScreens?(
                <FlexBetween gap="2rem">
                    <IconButton onClick={()=>dispatch(setMode())}>
                        {theme.palette.mode==="dark"?(
                            <LightMode sx={{fontSize:"25px"}}/>
                        ):(
                            <DarkMode sx={{color:dark, fontSize:"25px"}}/>
                        )}
                    </IconButton>
                    <IconButton>
                    <Message sx={{fontSize:"25px"}}/>
                    </IconButton>
                    <IconButton>
                    <Notifications sx={{fontSize:"25px"}}/>
                    </IconButton>
                    <IconButton>
                    <Help sx={{fontSize:"25px"}}/>
                    </IconButton>
                    <FormControl variant="standard" value={fullName}>
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor:neutralLight,
                                width:"150px",
                                borderRadius:"0.25rem",
                                padding:"0.25rem 1rem",
                                "& .MuiSvgIcon-root":{
                                    pr:"0.25 rem",
                                    width:"3rem"
                                },
                                "& .MuiSelect-select:focus":{
                                    backgroundColor:neutralLight
                                }
                            }}
                            input={<InputBase/>}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={()=>dispatch(setLogout())}>Log Out</MenuItem>
                            </Select>
                    </FormControl>
                </FlexBetween>
                ):(
                    <IconButton onClick={()=>setIsMobileMenuToggled(!isMobileMenuToggled)}>
                        <Menu sx={{fontSize:"25px"}}/>
                    </IconButton>
                )}

                {/* MOBILE NAV */}
                {!isNonMobileScreens && isMobileMenuToggled && (
                    <Box
                        position="fixed"
                        right="0"
                        bottom="0"
                        height="100%"
                        zIndex="10"
                        maxWidth="500px"
                        minWidth="300px"
                        backgroundColor={background}
                    >
                        {/* CLOSE ICON */}
                        <Box display="flex" justifyContent="flex-end" padding="1rem">
                            <IconButton onClick={()=>setIsMobileMenuToggled(!isMobileMenuToggled)}>
                                <Close/>
                            </IconButton>
                        </Box>

                        {/* MENU ITEMS */}
                        <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
                    <IconButton onClick={()=>dispatch(setMode())} sx={{fontSize:"25px"}}>
                        {theme.palette.mode==="dark"?(
                            <LightMode sx={{fontSize:"25px"}}/>
                        ):(
                            <DarkMode sx={{color:dark, fontSize:"25px"}}/>
                        )}
                    </IconButton>
                    <IconButton>
                    <Message sx={{fontSize:"25px"}}/>
                    </IconButton>
                    <IconButton>
                    <Notifications sx={{fontSize:"25px"}}/>
                    </IconButton>
                    <IconButton>
                    <Help sx={{fontSize:"25px"}}/>
                    </IconButton>
                    <FormControl variant="standard" value={fullName}>
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor:neutralLight,
                                width:"150px",
                                borderRadius:"0.25rem",
                                padding:"0.25rem 1rem",
                                "& .MuiSvgIcon-root":{
                                    pr:"0.25 rem",
                                    width:"3rem"
                                },
                                "& .MuiSelect-select:focus":{
                                    backgroundColor:neutralLight
                                }
                            }}
                            input={<InputBase/>}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={()=>{
                                    dispatch(setLogout());
                                    navigate("/");
                                }}>Log Out</MenuItem>
                            </Select>
                    </FormControl>
                </FlexBetween>
                    </Box>
                )}
        </FlexBetween>
    );
}