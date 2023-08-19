import React, { useState } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


import poster from '../../assets/images/uttejana.webp'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


function Home(props) {

    const navigate = useNavigate();

    const [bookingDate, setBookingDate] = useState("")
    const [bookingSlot, setBokkingSlot] = useState("")

    const [modalOpen, setModalOpen] = useState(false);
    const handleModalClose = () => {
        const response = fetch(`https://svce-booking-default-rtdb.firebaseio.com/users/${props.name.photoURL}.json`,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({userEmail:props.name.email,userName:props.name.displayName,booking:true,date:bookingDate,slot:bookingSlot})
    })  
    if(response){
      console.log("data added")
    }else{
      console.log("gone case")
    }

    
        setModalOpen(false)
    }

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Logout Done!!!")
            navigate("/");
        }).catch((error) => {
            console.error("Unable to logout")
        });
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setBookingDate(event.currentTarget.value)
        console.log(event.currentTarget.value)
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (value) => {
        console.log(value)
        setBokkingSlot(value)
        setAnchorEl(null);
        setModalOpen(true)

    };

    return (
        <>
            <div>
                <h2>{props.name ? `Welcome - ${props.name.displayName}` : "Login please"}</h2>
            </div>
            <h6>
                <Link onClick={handleSignOut}>SignOut</Link>
            </h6>
            <center>
                <Card sx={{ maxWidth: 345 }} style={{ justifyContent: 'center' }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                                R
                            </Avatar>
                        }

                        title="A Movie by Adarsh Ishwar"
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        sx={{ height: 356 }}
                        image={poster}
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <b>UTTEJANA</b>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            Booking Available Now.....
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            value="1jan2023"
                            variant="contained"
                            color="success"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>
                            1/jan/2023
                        </Button>
                        <Button
                            value="2jan2023"
                            variant="contained"
                            color="success"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>
                            2/jan/2023
                        </Button>
                        <Button
                            value="3jan2023"
                            variant="contained"
                            color="success"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>
                            3/jan/2023
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClick={(e) => { e.preventDefault(); handleClose(e.target.value) }}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem value="1" >Slot 1</MenuItem>
                            <MenuItem value="2">Slot 2</MenuItem>
                            <MenuItem value="3">Slot 3</MenuItem>
                        </Menu>
                    </CardActions>
                </Card>

            </center>
            <Modal
                open={modalOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {bookingDate}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                       {bookingSlot}
                    </Typography>
                    <Button variant="contained"  onClick={handleModalClose}>Pay Now</Button>
                </Box>
            </Modal>


        </>
    )
}

export default Home