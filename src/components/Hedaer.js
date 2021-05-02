import React, { useEffect, useState } from 'react';
import '../css/Header.css';
import {Link} from 'react-router-dom'
import Badge from '@material-ui/core/Badge';


const Header = ({basket_cnt}) => {
    const [basketcnt, setBasketcnt] = useState(localStorage.length);

    useEffect(()=>{
        setBasketcnt(localStorage.length)
    },[basket_cnt])

    return (
        <div>
            <div className="d-none d-sm-block">
                <div className="basket">
                    <Badge className="basket_badge" badgeContent={basketcnt} color="error" />
                    <Link to="/cart" className="Header_title"><span >장바구니</span></Link>
                </div>
                <div className="imgcontainer">
                    <img className="HeaderImg" src='https://image.wingeat.com/logo/images/we_logo_center.png' alt="Header" />
                </div>
            </div>
            <div className="d-block d-sm-none d-md-none d-flex justify-content-between mobile">
                <div>
                    <img className="HeaderImg_m" src='https://image.wingeat.com/logo/images/we_logo_center.png' alt="Header" />
                </div>
                <div className="basket_m">
                    <Badge className="basket_badge" badgeContent={basketcnt} color="error" />
                    <Link to="/cart" className="Header_title"><span >장바구니</span></Link>
                </div>
            </div>
        </div>
  )
}

export default Header;
