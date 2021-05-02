import React, { useState } from 'react';
import { Route } from 'react-router-dom' 
import './App.css';

import Header from './components/Hedaer';
import Feature from './components/Feature';
import List from './components/List';
import Cart from './page/Cart';

const App = () => {
  const [basket_cnt, setBasket_cnt] = useState(0);

  return (
    <div>
      <Header basket_cnt={basket_cnt} />
      <div className="container">
        <Route exact path='/' component={Feature} />
      <Route exact path={'/'}
          render={()=>(
            <List basket_cnt={(value)=>setBasket_cnt(value)} />
          )}/>
      <Route expact path='/cart' component={Cart} />
      </div>  
    </div>
  )
}
export default App;
