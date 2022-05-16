import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { Button,Box,Chip,Grid  } from '@mui/material'
import '../assets/quiz.css'
import Viewresult from './viewresult';

export default function Quizzical() {
  const{REACT_APP_BASE_URL}=process.env
  const viewConsole=  true;
  const [apiData,seApiData] = useState([]);
  const [apiError,setApiError] = useState('');
const [checkAnswer,setCheckAnswer] = useState(false);
  const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
   useEffect(() => {
     axios.get(REACT_APP_BASE_URL +"/api.php?amount=5&type=multiple")
    .then(response=>{
       let result = response.data.results
       result.forEach(element => {
        element.options = [];
        element.incorrect_answers.map(ans=>{
          let ansobj = {
            option:ans,
            isChange:false
          }
          element.options.push(ansobj);
        })
        element.options.push({
          option:element.correct_answer,
          isChange:false
        });
        element.options.sort(() => Math.random() - 0.5)
    });
        seApiData(result);
        viewConsole && console.log(result);
    })
    .catch(error=>{
        setApiError(error);
        viewConsole && console.log(apiError);
    })
}, [])
function changeOption(option,options){
        options.map(el =>{el.isChange = false})
        option.isChange = !option.isChange

        seApiData([...apiData]);
}
  return (
    <div>{ apiError && 
      <div>
          <label>There is some error</label>
      </div>} 
      { !apiError  && apiData?.length ===0 &&
        <div>
            <label>no data found</label>
        </div>}
        {!apiError && !checkAnswer  && apiData?.length >0 && <div className='mainDiv'>
          
            <Box sx = {{border:'1px solid black',width:'90%',padding:'10px'}}>
              {apiData.map(questions =>{
                const {question,options} =questions;
                   return <><h3>{renderHTML(question)}</h3><Box sx={{ padding: '10px' }}>
                      <Grid container spacing={12}>

                  {options.map(option =>{
                   return <Grid item xs={3}><Chip label={renderHTML(option.option)} color={option.isChange === true  ? "success":"primary"} onClick={()=>changeOption(option,options)}  /></Grid>
                  })}
              </Grid>
                </Box></>
              })}
               
                
                <hr/>
                <Button variant="contained" onClick={()=>setCheckAnswer(true)} sx = {{padding:'10px',borderRadius:'15px',maxWidth:'max-content',float:'right'}}>Check Answer</Button>
            </Box>
           

        </div>}

        {
          checkAnswer && <Viewresult apiData={apiData}/>
        }
      </div>
  )
}
