import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import axios from 'axios';
import {Card,Button,Form} from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';

class FavDrinks extends React.Component {

  constructor(props){
    super(props);

    this.state={
      favDrinks:[],   
      showForm:false,
      index: -1,
      drinkName:'',
      drinkObj:{},
    }
  }

  componentDidMount (){

    const {user} = this.props.auth0;
    
    axios
    .get(`http://localhost:3008/favDrinksR`, {params: {userEmail: user.email}})
    .then( result =>{
      this.setState({
        favDrinks: result.data,
      })
    }).catch(err=>{console.log(err)})
  } 

  // delete
  deleteDrinkM = (idx) =>{
    const {user} =this.props.auth0;
    axios
    .delete(`http://localhost:3008/deleteDrinkR/${idx}`, {params: {userEmail: user.email}})
    .then(result => {
      this.setState({
        favDrinks: result.data
      })
    }) .catch(err => {console.log(err)})
  }

  // update
  updateDrinkM = (drink,idx) => {
   
    this.setState({
      index: idx, // from map
      drinkName: drink.drinkName, // from map
      showForm: true,
      drinkObj: drink // from map
    })
    //console.log('state', this.state.showForm)
  }

  updateFormSubmit = (event) => {
   event.preventDefault();

  //  const newName= event.target.drinkName.value;
  //  const newDrinkObj ={
  //    drinkName: newName,
  //    drinkImg: this.state.drinkObj.drinkImg,
  //  }
  //  const {user} = this.props.auth0;

  //  const params = { 
  //    userEmail: user.email,
  //    drinkObj: newDrinkObj
  //  }

  const {user} = this.props.auth0;

   const params ={
     userEmail: user.email,
     drinkObj: {
       drinkName: event.target.drinkName.value,
       drinkImg:  this.state.drinkObj.drinkImg,
     }
   }
   
   axios
   .put(`http://localhost:3008/updateDrinkR/${this.state.index}`, params)
   .then(result => {
     this.setState({
       favDrinks: result.data,
     })
   }) .catch(err => {console.log(err)})
  }


  
  render() {
    return(
   <>
{
  this.state.showForm &&

  <Form onSubmit={e => this.updateFormSubmit(e)}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>drink name</Form.Label>
    <Form.Control type="text" defaultValue={this.state.drinkName} name='drinkName' />
  </Form.Group>

  {/* <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Image</Form.Label>
    <Form.Control type="text" defaultValue={this.state.} name='drinkImg'/>
  </Form.Group> */}
  
  <Button variant="primary" type="submit">
    Update
  </Button>
</Form>

}


   {this.state.favDrinks.length && this.state.favDrinks.map((drink,idx)=>{
     return(
     <>
      <Card style={{ width: '18rem' , display:'inline-block'}}>
     <Card.Img variant="top" src={drink.drinkImg} />
     <Card.Body>
       <Card.Title>{drink.drinkName}</Card.Title>
      
       <Button onClick={() => {this.deleteDrinkM(idx)}} variant="primary">Delete</Button>
       <Button  onClick={() => {this.updateDrinkM(drink,idx)}}   variant="primary">Update</Button>
     </Card.Body>
   </Card>
     </>
     )
    
   })}
   
   </>
    )
  }
}

export default withAuth0(FavDrinks);
