import React, { useEffect, useState } from 'react';
import '../css/List.css';

import axios from 'axios';

const List = ({basket_cnt}) =>{
    const [li, setLi] = useState([]);
    const [page, setPage] = useState(1);

    const infiniteScroll = () => {
        let scrollHeight = document.documentElement.scrollHeight
        let scrollTop = document.documentElement.scrollTop
        let clientHeight = document.documentElement.clientHeight

        if(scrollTop + clientHeight === scrollHeight && page <6){
            setPage(page+1)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', infiniteScroll);
          return () => {window.removeEventListener('scroll', infiniteScroll)
    }
      })

    useEffect(()=>{
        const arr = [];
        if (li.length !== 0){
            for (var i=0; i<li.length; i++){
                arr.push(li[i])
            }
        }

        axios.get(`https://node.wingeat.com/test-api/items?page=${page}`)
            .then((res)=>{
                for (var j=0;j<res.data.length;j++){
                    arr.push(res.data[j])
                }
                setLi(arr)
            }).catch((err)=>{
                console.log(err)
            })
        
    },[page])
    
    const addbasket = ((eat)=> {
        if (localStorage.getItem(eat.id)) {
            var cnt = localStorage.getItem(eat.id)
            localStorage.setItem(eat.id, [eat.image+'//'+eat.itemName+'//'+eat.price+'//'+(Number(cnt.split('//')[3])+1)])
            alert(`'${eat.itemName}' 상품 주문수량이 증가했습니다!`)
        } else {
            alert(`'${eat.itemName}' 상품이 장바구니에 추가되었습니다!`)
            localStorage.setItem(eat.id, [eat.image+'//'+eat.itemName+'//'+eat.price+'//'+1])
        }
        var bcnt = localStorage.length
        basket_cnt(bcnt)
    })


    const eatlist = li.map((eat,index)=>
    <div key={index} className="col-6 col-sm-4 col-md-3">
        <div onClick={()=>addbasket(eat)} className="item_list">
            <img className="list_img" src={'https://image.wingeat.com/'+eat.image} alt={eat.itemName}/>
            <p className="mb-1">{eat.itemName}</p>
            <p className="list_price">{eat.price}원</p>
        </div>
    </div>
    )

    



    return (
        <div>
            <p className="list_header">윙잇 MADE</p>
                <div className="row">
                    {eatlist}
                </div>
        </div>

    );
}

export default List