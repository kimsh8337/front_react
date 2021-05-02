import React, { useEffect, useState } from 'react';
import '../css/Cart.css';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ClearIcon from '@material-ui/icons/Clear';


const Cart = () =>{
    const [iscart, setIscart] = useState(false);
    const [blist, setBlist] = useState([]);
    const [itemprice, setItemprice] = useState();
    const [totalprice, setTotalprice] = useState();
    const [checkList, setCheckList] = useState([]);

    useEffect(()=>{
        if(localStorage.length === 0) {
            setIscart(false)
        }else{
            setIscart(true)
            const store = []
            let total = 0
            for (var i=0;i < localStorage.length;i++){
                const item = localStorage.getItem(localStorage.key(i))
                store.push({id:localStorage.key(i), image: item.split('//')[0], itemName : item.split('//')[1], price : item.split('//')[2], cnt:item.split('//')[3]})
                total += (Number(item.split('//')[2]) * Number(item.split('//')[3]))
            }
            setBlist(store)
            setTotalprice(total)
            setCheckList(new Array(localStorage.length).fill(true))
        }
    },[iscart])


    const newlist = ()=>{
        const store = []
        let total = 0
        for (var i=0;i < localStorage.length;i++){
            const item = localStorage.getItem(localStorage.key(i))
            store.push({id:localStorage.key(i), image: item.split('//')[0], itemName : item.split('//')[1], price : item.split('//')[2], cnt:item.split('//')[3]})
            total += (Number(item.split('//')[2]) * Number(item.split('//')[3]))
        }
        setBlist(store)
        setTotalprice(total)
    }
    
    const changePlusCnt = (eat) => {
        var cnt = localStorage.getItem(eat.id)
        localStorage.setItem(eat.id, [eat.image+'//'+eat.itemName+'//'+eat.price+'//'+(Number(cnt.split('//')[3])+1)])
        newlist()
    }

    const changeMinusCnt = (eat) => {
        var cnt = localStorage.getItem(eat.id)
        if(cnt.split('//')[3] === '1'){
            alert('최소 주문 갯수입니다.')
        }else{
            localStorage.setItem(eat.id, [eat.image+'//'+eat.itemName+'//'+eat.price+'//'+(Number(cnt.split('//')[3])-1)])
        }
        newlist()
    }

    const delList = (eat) => {
        localStorage.removeItem(eat.id)
        newlist()
    }


    const changeChecked = (event,bid,index)=>{
        const chli = []

        for (var j=0;j<localStorage.length;j++){
            if (j === index){
                chli.push(event.target.checked)
            }else{
                chli.push(checkList[j])
            }
        }
        setCheckList(chli)

        if(event.target.checked){
            let total = totalprice
            const item = localStorage.getItem(bid)
            total += (Number(item.split('//')[2]) * Number(item.split('//')[3]))
            setTotalprice(total)
        } else {
            let total = totalprice
            const item = localStorage.getItem(bid)
            total -= (Number(item.split('//')[2]) * Number(item.split('//')[3]))
            setTotalprice(total)
        }
    }

    

    const basketli = blist.map((item,index)=>
        <div className="li_box" key={index}>
            <div className="d-flex justify-content-between">
                <div>
                <input checked={checkList[index]} onChange={(event)=>changeChecked(event,item.id,index)} type="checkbox" />
                <span className="cart_name">{item.itemName}</span>
                </div>
                <ClearIcon onClick={()=>delList(item)}/>
            </div>
            <div className="d-flex justify-content-start">
                <img className="cart_img" src={'https://image.wingeat.com/'+item.image} alt={item.itemName} />
                <div className="pt-2">
                    <span className="cart_text">{item.price}원</span>
                    <div className="btn_group">
                        <Button color="secondary"><RemoveIcon onClick={()=>changeMinusCnt(item)} /></Button>
                        <span className="cart_text">{item.cnt}</span>
                        <Button color="secondary"><AddIcon onClick={()=>changePlusCnt(item)}/></Button>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <span className="cart_text">합계:{item.price*item.cnt}</span>
            </div>
        </div>
    )

    return(
        <div>
            <p className="cart_Title">장 바 구 니</p>
            {iscart ? 
            <div>
                <div>
                    {basketli}
                </div>
                <div className="d-flex justify-content-end my-3">
                    <div className="pt-2">
                        <span className="cart_pricetext">결제 예정 금액</span>
                        <span className="cart_price">{totalprice}원</span>
                    </div>
                        <Button variant="contained" color="secondary">주 문 하 기</Button>
                </div>
            </div>
            : <p>장바구니에 담긴 상품이 없음</p>}
        </div>
    );
};

export default Cart;