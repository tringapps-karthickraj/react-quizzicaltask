import React from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../assets/quiz.css'

export default function Startquiz() {
  return (
    <div className='margint'>
        <Typography sx = {{color:'black'}} gutterBottom variant="h5" component="div">
        Quizzical
        </Typography>
        <Typography sx = {{color:'black'}} gutterBottom variant="h7" component="div">
                 Some description & needed
        </Typography>
        <Button href='/quiz' variant="contained">Start quiz</Button>

    </div>
  )
}
