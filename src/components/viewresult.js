import React from 'react'
import { Box,Chip,Grid  } from '@mui/material'

export default function Viewresult(props) {
    const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
    const ApiData =props.apiData;
    console.log(ApiData);
    let index = 0;
  return (
    <div>
        {ApiData?.length >0 && <div className='mainDiv'>
          
            <Box sx = {{border:'1px solid black',width:'90%',padding:'10px'}}>
              {ApiData.map(questions =>{
                const {question,options,correct_answer} =questions;
                   return <><h3>{renderHTML(question)}</h3><Box sx={{ padding: '10px' }}>
 <Grid container spacing={12}>
                  {options.map(option =>{
                      if(option.isChange &&option.option === correct_answer){
                        index++;
                      }
                     
                   return <Grid item xs={3}><Chip label={renderHTML(option.option)} color={option.option === correct_answer ? "success": option.isChange === true ? "error":"primary"}   /></Grid>
                  })}
              </Grid>
                </Box></>
              })}
              
                
                <hr/>
                <label>your score is {`${index}/${ApiData.length}`}</label>
            </Box>
           

        </div>}
        </div>
  )
}
