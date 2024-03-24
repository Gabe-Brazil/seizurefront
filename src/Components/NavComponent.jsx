import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useState} from "react"
const styles={
  link:{
    color:"black",
    textDecoration:"none",
    marginLeft:"20px"
  },
  activeLink:{
    backgroundColor:"grey"
  }
}

function NavbarComponent({user,setUser}){

  const [active,setActive]=useState(1)


  return(
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
    
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link 
          onClick={()=>{setActive(1)}}
          className={active===1?"active-link":""} style={styles.link}  to="/">Input Seizure</Link>
          <Link 
          onClick={()=>{setActive(2)}}
          className={active===2?"active-link":""} style={styles.link}  to="/medication">Medication Timeline</Link>
          <Link
            onClick={()=>{setActive(3)}}
          className={active===3?"active-link":""} style={styles.link}  to="/stats">Statistics</Link>
          <Link
            onClick={()=>{setActive(4)}}
          className={active===4?"active-link":""} style={styles.link}  to="/acc">Account</Link>
        </Nav>
        
        {user&& user.isLogIn && <Button onClick={()=>{
           setUser({name:"",isLogIn:false})
           window.localStorage.setItem("token","")
        } }>Log Out</Button>}
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavbarComponent;