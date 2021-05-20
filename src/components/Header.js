import React from 'react'
import { Container } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListIcon from '@material-ui/icons/List';
import { Link } from "react-router-dom";
const Header = () => {

return (
    
    <Container align='right' style={{marginBottom: '5%', paddingTop: '5%'}} > 
    <Link to="/triton-html" style={{textDecoration: 'none', marginRight: '2rem'}}>
    <ListIcon fontSize='large'/>
</Link>

<Link to="/triton-html/basket" style={{textDecoration: 'none'}}>
    <ShoppingCartIcon fontSize='large' />
    </Link>
    
    </Container>
)

}

export default Header

