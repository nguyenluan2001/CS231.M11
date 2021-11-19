import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';
import { Button, Stack, Typography } from '@mui/material';
import axios from "axios"
import axiosClient from '../api';
const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    height: "200px",
    width: "70%",
    margin: "0 auto"
};
const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};
function Homepage() {
    const { acceptedFiles, getRootProps, getInputProps, isDragAccept, isDragActive } = useDropzone();
    const [style, setStyle] = useState(baseStyle)
    const [previewImg, setPreviewImg] = useState(null)
    const [listImages, setListImages] = useState(null)
    useEffect(() => {
        setStyle(pre => {
            return {
                ...pre,
                borderColor: isDragAccept ? "red" : "",
                borderColor: isDragActive ? "green" : "",

            }
        })
    }, [isDragAccept, isDragActive])
    useEffect(() => {
        console.log(acceptedFiles)
        if (acceptedFiles.length > 0) {
            let previewImg = URL.createObjectURL(acceptedFiles[0])
            setPreviewImg(previewImg)
        }
    }, [acceptedFiles])
    async function handleSearchImage() {
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        let listImages = await axiosClient.post("/uploader", formData)
        console.log(listImages.data)
        setListImages(listImages.data)
    }
    return (
        <Container maxWidth="lg" sx={{ pt: 5 }}>
            <Typography variant="h3">PROJECT IMAGES RETRIEVAL</Typography>
            <Box {...getRootProps({ className: 'dropzone11', style: style })}>
                <input {...getInputProps()} />
                <Typography>Drag 'n' drop image here, or click to select image</Typography>
            </Box>
            <Stack direction="row" justifyContent="center" sx={{
                mt: 5,
            }}>
                <Stack direction="column" justifyContent="center" alignItems="center" sx={{ width: "500px", height: "300px" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Your image</Typography>
                    <img src={previewImg} alt="" style={{ height: "100%", width: "fit-content" }} />
                    {previewImg && <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => handleSearchImage()}>Search</Button>}
                </Stack>
            </Stack>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gridGap: "10px 10px"

                }}
            >
                {listImages?.map(item => {
                    return <img src={item.url}></img>
                })}
            </Box>
        </Container>
    )
}

export default Homepage
