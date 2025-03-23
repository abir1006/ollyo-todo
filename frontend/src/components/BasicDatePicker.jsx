import * as React from 'react';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker({labelText}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label={labelText}/>
        </LocalizationProvider>
    );
}