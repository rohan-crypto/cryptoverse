import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import {Layout, Typography, Space} from 'antd';
import './App.css';

// in order to import navbar and other components in easy way we used index.js in 
// components folder
import {Navbar, HomePage, Exchanges, CryptoCurrencies, CryptoDetails, News} 
  from './components';

const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar/>
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route exact path='/' element={<HomePage/>}/>
              <Route exact path='/exchanges' element={<Exchanges/>} />
              <Route exact path='/cryptocurrencies' element={<CryptoCurrencies/>}/>
              <Route exact path='/crypto/:coinId' element={<CryptoDetails/>}/>
              <Route exact path='/news' element={<News/>}/>
            </Routes>
          </div>
        </Layout>
        <div className='footer'>
          <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
            CryptoVerse <br/>
            All rights reserved | &copy;
          </Typography.Title>
          {/* Space is a div which places space between items */}
          <Space>
            <Link to="/">Home</Link>
            {/* <Link to="/exchanges">Exchanges</Link> */}
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  )
};

export default App;
