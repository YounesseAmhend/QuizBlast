import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { useEffect, useRef, useState } from 'react';
interface Props{
    time: number
    setTime : React.Dispatch<React.SetStateAction<number>>
}
export default function Time(props: Props){
    const {setTime, time} = props;
    const Times = [
        undefined,
        15,
        30,
        45,
        60
    ]
    
    useEffect(()=>{},[])
    return (
        <>
            <Box sx={{ minWidth: 110 }}>
                <FormControl fullWidth>
                    <InputLabel className='text-xl' id="time">Timer</InputLabel>
                    <Select
                    labelId="time"
                    id="time"
                    label="Timer"
                    value={time}
                    onChange={(event)=>setTime(typeof event.target.value === "string" ? parseInt(event.target.value)  :event.target.value)}
                    className=' text-center h-10'
                    >
                        {Times.map((time: number | undefined)=>{
                            return (
                                time ? 
                                <MenuItem  value={time}>{time}s</MenuItem>
                                : 
                                <MenuItem defaultChecked value={0}>No Limit</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Box>
        </>
    )
}
