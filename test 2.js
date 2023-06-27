import { Button, Card, CardContent, Container, Grid, InputAdornment, LinearProgress, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import './HeroStyles.css'
import Coin from '../assest/coin.png'
import Lock from '../assest/lock.png'
import { ToastError} from './toast'
import { ethers } from 'ethers';
import { WalletConnect } from '../blockchain/wallet'
import FlipCountdown from '@rumess/react-flip-countdown';
import Thumbnil1 from '../assest/thumbnil1.png';
import Thumbnil2 from '../assest/thumbnil2.png';
import Thumbnil3 from '../assest/thumbnil3.png';
import Thumbnil4 from '../assest/thumbnil4.png';
import globe from '../assest/globe.png';

import { Zepcoin_Abi, Zepcoin_Address, Usdt_Address, Usdt_Abi, Busd_Address, Busd_Abi, Ico_Address, Ico_Abi, RpcUrl } from '../blockchain/config';
const providerx = new ethers.providers.JsonRpcProvider(
    RpcUrl,
);
let Dapp_Provider;
let User_Wallet;
let referal_link = undefined;
let referal_status = "none";



const Zepcoin_Cn = new ethers.Contract(Zepcoin_Address, Zepcoin_Abi, providerx);
const Usdt_Cn = new ethers.Contract(Usdt_Address, Usdt_Abi, providerx);
const Busd_Cn = new ethers.Contract(Busd_Address, Busd_Abi, providerx);
const Ico_Cn = new ethers.Contract(Ico_Address, Ico_Abi, providerx)


const queryParams = new URLSearchParams(window.location.search);
const zepxid = queryParams.get('zepxid');

const ZepCoinCalculator = (props) => {
    const curencySelectRef = useRef()
    const [BtnStatus, setBtnStatus] = useState('Buy Now');
    const [Selected_Coin, setSelected_Coin] = useState();
    const [CoinAmount, setCoinAmount] = useState();
    const [btn_state, setbtn_state] = useState(true);
    const [condtionalDisplay, setCondtionalDisplay] = useState("block")
    const [values, setValues] = useState({
        current: 0,
        converted: 0,
        currency: "USD"
    });
    useEffect(() => {
        setCondtionalDisplay(referal_status);
        
    }, [])
    
    useEffect(() => {
        get_data();
    }, [])

    const [SoldOut, setSoldOut] = useState('1101');
    const [LeftIn, setLeftIn] = useState('1599990000');
    const [ico_per, setIcoper] = useState('0.01');
    const [ico_per_str, setIcoperstr] = useState('');

    const get_data = async() => {
        const Ico_Balnce = await new Zepcoin_Cn.balanceOf(Ico_Address);
        const val =  BigInt(Ico_Balnce);
        const actual = 16250000000;
        const LeftIn = String(val).slice(0, 11);
        const SoldOut = (actual - Number(LeftIn));
        const ico_per = ((SoldOut / actual) * 100).toFixed(2);
        setSoldOut(SoldOut);
        setLeftIn(LeftIn);
        setIcoperstr(ico_per + '%');
        setIcoper(ico_per)  
    }


    const ButtonControler = async () => {
        try {
            if (User_Wallet !== undefined) {
                // console.log(User_Wallet)
                if (Selected_Coin === "USD") {
                    if (CoinAmount === 0) {
                        alert('Coin Amount Not selected');
                    } else {
                        const Usdt_Bal = await Usdt_Cn.balanceOf(User_Wallet);

                        if (CoinAmount >= Usdt_Bal) {
                            alert('insufficient ballance');
                        }
                        else {
                            Buy_Through_Usdt();
                        }
                    }
                }
                if (Selected_Coin === "BUSD") {
                    if (CoinAmount === 0) {
                        alert('Coin Amount Not selected');
                    } else {
                        const Busd_Bal = await Busd_Cn.balanceOf(User_Wallet);
                        if (CoinAmount >= Busd_Bal) {
                            alert('insufficient ballance');
                        }
                        else {
                            Buy_Through_Busd();
                        }
                    }
                }
            } else {
                alert("Please Connect To your Wallet First");
            }

        } catch (error) {
            ToastError("error in payment system")
            console.log(error);
        }
    }






    const handleConvertValue = event => {
        const { value } = event.target;
        const parsed = parseFloat(value);
        let result = 0

        if (values.currency === 'USD') {
            setSelected_Coin('USD');
            result = parsed * 1000;
            setCoinAmount(parsed);
        }
        if (values.currency === 'BUSD') {
            setSelected_Coin('BUSD');
            result = parsed * 1000
            setCoinAmount(parsed);
        }
        setValues(pre => ({
            ...pre,
            current: parsed,
            converted: result
        }))
    }
    const [openModal, setOpenModal] = React.useState(false);
    const handleCloseModal = () => setOpenModal(false);
    const stylemodal = {
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
    function share() {
        navigator.clipboard.writeText(referal_link);
        alert("copied Succesfully");
    }

    const Buy_Through_Busd = async () => {
        try {
            const Busd_wr = new ethers.Contract(Busd_Address, Busd_Abi, Dapp_Provider);
        setBtnStatus('Please Wait')
        const transaction_aprove = await Busd_wr.approve(Ico_Address, BigInt(CoinAmount * 10 ** 18));
        await transaction_aprove.wait();
        console.log("errr")
        const Ico_wr = new ethers.Contract(Ico_Address, Ico_Abi, Dapp_Provider);
        if (zepxid === null) {
            const transaction = await Ico_wr.BuyToken_Busd_referal(BigInt(CoinAmount), 0);/* global BigInt */
            await transaction.wait();
            setBtnStatus("Buy Now");
            const referal_url = await Ico_Cn.Get_referal_url(User_Wallet);
            referal_link = referal_url;
            setbtn_state(false)
            alert('Purchase Succesfull');
        } else {
            const transaction = await Ico_wr.BuyToken_Busd_referal(BigInt(CoinAmount), zepxid);
            await transaction.wait();
            setBtnStatus("Buy Now");
            const referal_url = await Ico_Cn.Get_referal_url(User_Wallet);
            referal_link = referal_url;
            setBtnStatus(false)
            alert('Purchase Succesfull');
        }
        } catch (error) {
            alert('Something Went Wrong');
            setBtnStatus("Buy Now")
        }
    }


    const Buy_Through_Usdt = async () => {
        try {
            const Busd_wr = new ethers.Contract(Usdt_Address, Usdt_Abi, Dapp_Provider);
            setBtnStatus("Please Wait")
            const transaction_aprove = await Busd_wr.approve(Ico_Address, BigInt(CoinAmount * 10 ** 18));
            await transaction_aprove.wait();
            const Usdt_wr = new ethers.Contract(Ico_Address, Ico_Abi, Dapp_Provider);
            if (zepxid === null) {
                const transaction = await Usdt_wr.BuyToken_Usdt_referal(BigInt(CoinAmount), 0); // get data from user
                await transaction.wait();
                const new_url = await Ico_Cn.Get_referal_url(User_Wallet);
                referal_link = new_url;
                setbtn_state(false)
                alert('Purchase Sucessfully')
                setBtnStatus("Buy Now");
            } else {
                const transaction = await Usdt_wr.BuyToken_Usdt_referal(BigInt(CoinAmount), zepxid); // get data from user
                await transaction.wait();
                const new_url = await Ico_Cn.Get_referal_url(User_Wallet);
                referal_link = new_url;
                setbtn_state(false)
                setBtnStatus("Buy Now");
                alert('Purchase Sucessfully');
            }
    
        } catch (error) {
            alert("Something Went Wrong")
            setBtnStatus("Buy Now")
        }
    }
   
    return (
        <>
            <div className='value' id="value1"> 
            
            <div style={{ color: "#feb114" }}> $1 = </div>  1,000 ZEPX  </div>
            <Card variant='outlined' className='boxdesign'>
                <CardContent>
                    <Typography variant='h3' gutterBottom>
                        ZEPCOIN
                    </Typography>
                    <Typography variant="h6" gutterBottom
                        className='boxtitle'
                    >
                        A TOKEN TO THE ZEPVERSE
                    </Typography>
                </CardContent>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography variant='subtitle1' style={{ textAlign: "left",color:'#FFB827',fontSize:'1.5rem' }}>$ZEPX Sold</Typography>
                            <TextField  value={new Intl.NumberFormat('en-IN').format(SoldOut)} fullWidth  disabled
                                className='boxinput'
                                inputProps={{
                                    style: {
                                        background: "transparent",
                                        padding: "15px",
                                        borderRadius: 10,
                                        WebkitTextFillColor:'#fff',
                                        border:'2px solid white'
                                      
                                    }
                                }}
                                
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant='subtitle1' style={{ textAlign: "left",color:'#FFB827',fontSize:'1.5rem'  }}>$ZEPX Left</Typography>
                            <TextField value={new Intl.NumberFormat('en-IN').format(LeftIn)} fullWidth  disabled
                                inputProps={{
                                    style: {
                                        background: "transparent",
                                        padding: "15px",
                                        borderRadius: 10,
                                        WebkitTextFillColor:'#fff' ,
                                        border:'2px solid white'
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardContent>

                    <LinearProgress value={Number(ico_per)} variant='determinate' color='info' sx={{
                        height: 10,
                        borderRadius: 10,
                        background: 'white'
                    }} />
                    <Typography variant='h6'>
                        <div> <span className='icoper'> {ico_per_str} </span>Completed</div>
                    </Typography>
                </CardContent>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <OutlinedInput
                                value={values.current}
                                style={{ backgroundColor: "white", paddingRight: 0 }}
                                onChange={handleConvertValue}
                                type="number"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Select
                                            autoWidth
                                            ref={curencySelectRef}
                                            value={values.currency}
                                            onChange={event => {
                                                setValues(pre => ({
                                                    ...pre,
                                                    currency: event.target.value
                                                }))
                                            }}
                                        >
                                            <MenuItem value={'USD'}>$USDT</MenuItem>
                                            <MenuItem value={'BUSD'}>$BUSD</MenuItem>
                                        </Select>
                                    </InputAdornment>}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <OutlinedInput
                                value={values.converted}
                                style={{ backgroundColor: "#fff", color: "#000" }}
                                disabled
                                type="number"
                                endAdornment={
                                    <InputAdornment
                                        position="end">
                                        <Typography variant='body2' color='black'>$ZEPX</Typography>
                                    </InputAdornment>
                                }
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardContent>
                    <div className='buttonview'>
                    <Button variant='contained' onClick={ButtonControler} className="btn" style={{
                        width: "auto",
                        padding: "10px 20px",
                        marginRight: "10px"
                    }}>{BtnStatus}</Button>
                   

                    {(props.hideBtnStatus) || (btn_state!==true) ?
                        <Button variant='contained' onClick={share} className="btn" style={{
                            width: "auto",
                            padding: "10px 20px",
                            marginLeft: "10px",
                            display: { condtionalDisplay }
                        }}>Refer And Earn</Button>

                        :

                        null
                    }
                    </div>
                </CardContent>
            </Card>
            <div></div></>
    )
}

const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'transparent',
    boxShadow: 24,
};
const Hero = () => {
    const [BtnStatus, setBtnStatus] = useState("CONNECT WALLET")
    const [referStatus, setReferStatus] = useState(false)
    const connectWallet = async () => {
        try {
            const obj = await WalletConnect();
            Dapp_Provider = obj.signer;
            User_Wallet = obj.Address;
            setBtnStatus('Connected')
            const referal_url = await Ico_Cn.Get_referal_url(obj.Address);
            const _Referal_id = await Ico_Cn.GetUser_Id(obj.Address);
            referal_link = referal_url;
            if (_Referal_id >= 1000) {
                setReferStatus(true);
            } else {
                setReferStatus(false);
            }
        } catch (error) {

        }
    }


    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const handleOpen3 = () => setOpen3(true);
    const handleClose3 = () => setOpen3(false);


    const timerSizeValue = () => {
        const { innerWidth } = window;
        if (innerWidth > 960) {
            return 'medium'
        }
        else {
            return 'small'
        }
    }
    const spacing = '  ';
    return (
        <>

            <header>
                <nav className='navbar'>
                    <div className='logo'>
                        <a href='https://zepcoin.io/' target={'_blank'} rel="noopener noreferrer"><img src={Coin} alt='' /></a>
                    </div>
                    <div className='logotitle'> <div className="logotitle_heading" >  ZEPCOIN </div><p>(Pre - IEO)</p></div>

                    <div className='logobtn'>
                        <Button onClick={connectWallet} className="btn"><div className='imgbtn'> <img src={Lock} alt="lock" /></div><div className='btntext'>{BtnStatus}</div></Button>
                    </div>
                    {/* <div className='hamburger' onClick={handleClick}>
                   {click ? (<FaTimes size={20} style={{ color: '#ffffff' }} />) : (<FaBars size={20} style={{ color: '#ffffff' }} />)}

            </div> */}
                </nav>
            </header>
            <div className='hero'>

                <Container maxWidth='xlg'>

                    <div className='content'>
                        <div className='col-1'>
                            <h3 className='secondarytext bgwhite'>Get Ready To Buy</h3>
                            <h1>ZEPCOIN</h1>
                            <div className='value'><p><span> $1 = {spacing}</span> 1,000 ZEPX </p> </div>
                            <div className='timer'>
                                <FlipCountdown
                                    size={timerSizeValue()}
                                    titlePosition='bottom'
                                    hideYear
                                    hideMonth
                                    endAt={'2022-12-30 23:59:59'} // Date/Time
                                />
                            </div>
                            <div className='ptext'> The Future Crypto is here</div>
                        </div>

                        <div className='col-2'>
                            <ZepCoinCalculator hideBtnStatus={referStatus} />                        

                        </div>
                       

                    </div>
                    <div className='footer'>       
                    <div className='youtubetitle'>Zepverse Zone:</div>                
                       <div className='youtubevedio'>
                           <div className='child'> </div>
                           <div className='child1'>
                               <div className='youtubevedioitem'>
                                   <Button onClick={handleOpen}><img height="80px" src={Thumbnil2} alt="vedio" /></Button>
                                   <Modal
                                       open={open}
                                       onClose={handleClose}
                                       aria-labelledby="keep-mounted-modal-title"
                                       aria-describedby="keep-mounted-modal-description"
                                   >
                                       <Box sx={style1}>
                                           <iframe width="460" height="315" src="https://www.youtube.com/embed/tMOuwHcLKxw?controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                                       </Box>
                                   </Modal>
                               </div>
                               <div className='youtubevedioitem'>
                                   <Button onClick={handleOpen1}><img height="80px" src={Thumbnil1} alt="vedio" /></Button>
                                   <Modal
                                       open={open1}
                                       onClose={handleClose1}
                                       aria-labelledby="keep-mounted-modal-title"
                                       aria-describedby="keep-mounted-modal-description"
                                   >
                                       <Box sx={style1}>
                                           <iframe width="460" height="315" src="https://www.youtube.com/embed/l54E-SyS6YU?controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                                       </Box>
                                   </Modal>
                               </div>
                           </div>
                           <div className='child2'>
                               <div className='youtubevedioitem'>
                                   <Button onClick={handleOpen2}><img height="80px" src={Thumbnil3} alt="vedio" /></Button>
                                   <Modal
                                       keepMounted
                                       open={open2}
                                       onClose={handleClose2}
                                       aria-labelledby="keep-mounted-modal-title"
                                       aria-describedby="keep-mounted-modal-description"
                                   >
                                       <Box sx={style1}>
                                           <iframe width="460" height="315" src="https://www.youtube.com/embed/6Y52kPCB9bE?controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                                       </Box>
                                   </Modal>
                               </div>
                               <div className='youtubevedioitem'>
                                   <Button onClick={handleOpen3}><img height="80px" src={Thumbnil4} alt="vedio" /></Button>
                                   <Modal
                                       keepMounted
                                       open={open3}
                                       onClose={handleClose3}
                                       aria-labelledby="keep-mounted-modal-title"
                                       aria-describedby="keep-mounted-modal-description"
                                   >
                                       <Box sx={style1}>
                                           <iframe width="460" height="315" src="https://www.youtube.com/embed/D2HnBq8I7EU?controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>

                                       </Box>
                                   </Modal>
                               </div>


                           </div>
                       </div>
                   </div>
                   <div className='footerlink'>
                    <img src={globe} alt="webpage"/>
                     <a href='https://zepverse.io' target="_blank">zepverse.io </a> | <a target="_blank" href='https://zepcoin.io'> zepcoin.io</a></div>
                </Container>
                <div className='bottomimage'><img src={Coin} alt='coin' height="100" width="100"/></div>
            </div>

        </>
    )
}

export default Hero
