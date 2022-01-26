import React, {useState, useEffect} from 'react';
import millify from 'millify';
import {Link} from "react-router-dom"
import {Card, Row, Col, Input} from "antd";
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const CryptoCurrencies = ({simplified}) => {

  // on homepage show top 10 on coin details page show all 100 
  const count = simplified ? 10 : 100;

  // rename data to cryptosList
  const {data: cryptosList, isFetching} = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => 
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if(isFetching) return <Loader/>;

  return (
    <>
    {/* following contiditon is so that searchbox does not appear on homepage */} 
    {!simplified && (
      <div className="search-crypto">
        <Input placeholder="Search Cryptocurrency" 
          onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
    )}
    {/* gutter gives space between items. here, gutter={[y-axis, x-axis]} */}
      <Row gutter={[32,32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card title={`${currency.rank}. ${currency.name}`} hoverable
                extra={<img className="crypto-image" src={currency.iconUrl} />}
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
};

export default CryptoCurrencies;
