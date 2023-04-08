import React from "react";
import styled from "styled-components";
import { filterProducts, sortProducts } from '../../redux/Shopping/shopping-actions'
// Redux
import { connect } from "react-redux";

import Product from "./Product/Product";
import { Layout, Menu } from 'antd';


const Products = ({ products, sort, filter, size  }) => {
  const {  Sider } = Layout;

  return (
    <>
    <Sidebar>
      <Layout>
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 20,
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} >
        <br></br>
      <Menu.Item key="1" style={{listStyle:"none",paddingLeft:4}} >
          <Filter>
          <Sort>
          Sort By: &nbsp; 
          <select onChange={(e) => sort(e.target.value)}>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
           </Sort>
          </Filter>
        </Menu.Item>
        <br></br>
        <Menu.Item key="1" style={{listStyle:"none",paddingLeft:4}} >
          <Filter>
          <p>Filters:</p>
          </Filter>
        </Menu.Item>
        <br></br>
        <Menu.Item key="2" style={{listStyle:"none",paddingLeft:4}}>
          <Size>
          <p>BRAND</p>
          <input type="checkbox" onClick={(e) =>filter('Asian Creative',e.currentTarget.checked)} /><span>Asian Creative</span>
          <br></br>
          <input type="checkbox" onClick={(e) =>filter('On Cloud', e.currentTarget.checked)} /><span>On Cloud</span>
          <br></br>
          <input type="checkbox" onClick={(e) =>filter('Jordan',e.currentTarget.checked)} /><span>Jordan</span>
          <br></br>
          <input type="checkbox" onClick={(e) =>filter('Yonex',e.currentTarget.checked)} /><span>Yonex</span>
          <br></br>
          <input type="checkbox" onClick={(e) =>filter('Skechers',e.currentTarget.checked)} /><span>Skechers</span>
          <br></br>
          <input type="checkbox" onClick={(e) =>filter('Puma',e.currentTarget.checked)} /><span>Puma</span>
          <br></br>
          <input type="checkbox" onClick={(e) =>filter('Converse All Star',e.currentTarget.checked)} /><span>Converse All Star</span>
          <br></br>
          <input type="checkbox" onClick={(e) =>filter('Pony',e.currentTarget.checked)} /><span>Pony</span>
          </Size>
        </Menu.Item>
        <br></br>
        <Menu.Item key="3" style={{listStyle:"none",paddingLeft:4}}>
          <Size>
         <p>IDEAL FOR</p>
          <input type="checkbox" onClick={(e) =>filter('Men', e.currentTarget.checked)} /><span>MEN</span>
          <br></br>
          <input type="checkbox" onClick={(e) =>filter('WoMen', e.currentTarget.checked)} /><span>Women</span>
          <br></br>
          <input type="checkbox" onClick={(e) =>filter('Kids', e.currentTarget.checked)} /><span>Kids</span>
          </Size>
        </Menu.Item>
        <br></br>
        <Menu.Item key="4" style={{listStyle:"none",paddingLeft:4}}>
          <Size>
          <p>SIZE</p>
          <input type="checkbox" onClick={(e) =>filter('25',e.currentTarget.checked)} /><span>20-30</span>
          <br></br>
          <input type="checkbox" onClick={(e) =>filter('42',e.currentTarget.checked)} /><span>30-40</span>
          <br></br>
          <input type="checkbox" onClick={(e) =>filter('45',e.currentTarget.checked)} /><span>40-50</span>
           </Size>
        </Menu.Item>
      </Menu>
    </Sider>
    </Layout>
    </Sidebar>


    <ProductsContainer>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ProductsContainer>
    </>
  );
};

// CSS Styles
const Sort = styled.div`
  font-weight: bold;
  select {
    padding: 8px 12px;
    border: 1px solid #1a1a1a;
    cursor : pointer;
    border-radius: 5px;

    .select:focus,
    .select:hover{
      outline: none;
      border: 1px solid #1a1a1a;
    }
  }      
`

const Sidebar = styled.div`
margin-top: 60px;
`

const Size = styled.div`
 margin: 0.1rem;

 span {
  padding: 5px;
 }

 & p{
    font-size: 1rem;
    font-weight: bold;
    margin: 0.1rem;
  }
 `
  const Filter = styled.div`
  margin: 0.1rem;
  & p{
    font-size: 1rem;
    font-weight: bold;
    margin: 0.1rem;
  }
`

const ProductsContainer = styled.div`
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  margin: 20px 0px 0px 0px;
  grid-gap: 1rem;
  align-items: center;
  margin-left: 300px;
  line-height: 2;
`
// CSS STYLES END

const mapDispatchToProps = (dispatch) => {
  return {
    sort: (sortOrder) => dispatch(sortProducts(sortOrder)),
    filter: (filterProd,checked) => dispatch(filterProducts(filterProd,checked)),
  }
}

export default connect(null, mapDispatchToProps)(Products);
