import { Badge } from '@material-ui/core'
import { HorizontalSplit, ShoppingCartOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { loggingOut } from '../redux/apiCalls'

const Container = styled.div`
  ${mobile({ width: "100vw" })};
  height:60px;
  margin-top: -10px;
  padding-bottom:10px;
`;
const Wrapper = styled.div`
  ${mobile({ width: "95vw" ,padding:0 })};
  padding : 0 20px;
  display:flex;
  justify-content : space-between;
  
`

const Left = styled.div`
  ${mobile({ display: "none" })};

  flex:1;
  display:flex;
  align-items:center;
`
const Center = styled.div`
flex:1;
text-align: center;
`;

const Right = styled.div`
flex:1;
display: flex;
align-items:center; 
justify-content: flex-end;
`;


const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ paddingLeft:0 })};
`

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left:30px;
`
const Dropdown = styled.div`
  ${mobile({ width: "100vw" })};
  width: 20vw;
  position: fixed;
  z-index: 3;
  right: 0;
  top:80px;
  background-color: wheat;
  text-align: center;
  height: 2
  00px;

`

const List = styled.ul`
  list-style: none;
`
const ListItem = styled.li`
  margin: 10px;
`

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity);
  const user = useSelector(state => state.user.currentUser);
  const [dropdownMenu,setMenu] = useState(false);

  const dispatch = useDispatch();
  const handleLogout= () =>{
    loggingOut(dispatch);
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          {/* <Language>English</Language>
          <SearchContainer>
            <Input />
            <Search style={{ color: "grey", fontSize: 16 }} />
          </SearchContainer> */}
        </Left>
        <Center>
          <Link style={{ width: "100%", display: 'flex', justifyContent: 'center', textDecoration: 'none', color: 'black' }} to={"/"}><Logo>SEV7N</Logo></Link>
        </Center>
        <Right>
          {!user ? <><MenuItem>
            <Link style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none', color: 'black' }} to={"/register"}>
              Register
            </Link>
          </MenuItem>

            <MenuItem>
              <Link style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none', color: 'black' }} to={"/login"}>
                SIGN IN
              </Link>
            </MenuItem>
          </>
            :
            <MenuItem>Hello {user.username}</MenuItem>
          }
          <MenuItem>
            <Badge badgeContent={quantity} color="secondary">
              <Link style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none', color: 'black' }} to={"/cart"}>
                <ShoppingCartOutlined />
              </Link>
            </Badge>
          </MenuItem>
          { user && <MenuItem>
            <div onClick={()=>setMenu(!dropdownMenu)}>
              <HorizontalSplit/>
            </div>
          </MenuItem>}
        </Right>
        {(user && dropdownMenu) && <Dropdown>
          <List>
            <ListItem><Link style={{marginLeft:"-15%"}} to={"/"}>Home</Link></ListItem>
            <ListItem><Link style={{marginLeft:"-15%"}} to={"/orders/" + user._id}>Orders</Link></ListItem>
            <ListItem><Link style={{marginLeft:"-15%"}} onClick={handleLogout}>Logout</Link></ListItem>
          </List>
      </Dropdown>}
      </Wrapper>
    </Container>
  )
}

export default Navbar