import { useEffect, useState } from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { MenuItem } from '@mui/material';

function App() {
    const [array, setArray] = useState([])
    const [tokenSend, setTokenSend] = useState('')
    const [tokenReceive, setTokenReceive] = useState('')
    const [priceTokenSend, setPriceTokenSend] = useState('')
    const [priceTokenReceive, setPriceTokenReceive] = useState('')
    useEffect(() => {
        getArray()
    }, [])

    const getArray = async () => {
        try {
            const res = await axios.get('https://interview.switcheo.com/prices.json')
            if (res && res.data) {
                setArray(res.data)
            }
        } catch (error) {
            console.log("error : ", error)
        }
    }

    const handleTokenSend = (item) => {
        setTokenSend(item)
    }

    const convertToken = () => {
        let convertToken = tokenSend * priceTokenSend / priceTokenReceive
        setTokenReceive(convertToken)
    }

    const handleBtn = () => {
        convertToken()
    }



    return (
        <div className='wrapper'>
            <form className='swap-form' action='#'>
                <h3>Swap</h3>
                <div className='input-wrapper'>
                    <div className='input-section'>
                        <TextField
                            select
                            label="Select"
                            onChange={(e) => setPriceTokenSend(e.target.value)}
                        >
                            {array.map((option, index) => (
                                <MenuItem key={index} value={option.price}  >
                                    {option.currency}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Amout to send"
                            onChange={(e) => handleTokenSend(e.target.value)}
                        >

                        </TextField>

                    </div>
                    <div className='input-section'>
                        <TextField
                            select
                            label="Select"
                            onChange={(e) => setPriceTokenReceive(e.target.value)}

                        >
                            {array.map((option, index) => (
                                <MenuItem key={index} value={option.price} >
                                    {option.currency}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Amout to receive"
                            value={tokenReceive}
                        >
                            {tokenReceive}
                        </TextField>

                    </div>
                </div>
                <div >
                    <button className='confirm-btn-wrap' onClick={handleBtn}>
                        Confirm swap
                    </button>

                </div>

            </form>
        </div>
    );
}

export default App;
