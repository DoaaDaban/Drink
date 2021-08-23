// import React from 'react';
// import axios from 'axios';
// import { withAuth0 } from '@auth0/auth0-react';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Card, Button } from 'react-bootstrap';



// class Home extends React.Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       allDrinks: [],
//     }
//   }

//   componentDidMount() {

//     axios.get(`http://localhost:3008/getAllDrinks`)
//       .then(result => {

//         this.setState({
//           allDrinks: result.data
//         })
//       })
//   }


//   addDrinkM = (drinkObj) => {
//     const { user } = this.props.auth0;

//     const params = {
//       userEmail: user.email,
//       drinkObj: {
//         drinkName: drinkObj.strDrink,
//         drinkImg: drinkObj.strDrinkThumb
//       }
//     }
//     axios
//       .post(`http://localhost:3008/addDrinksR`, params)
//        .catch(err => {console.log(err)})
//   }


//   render() {

//     return (
//       <>
//         {
//           this.state.allDrinks.length && this.state.allDrinks.map((drink, idx) => {

//             return (
//               <>
//                 <Card style={{ width: '18rem', display: 'inline-block' }} >
//                   <Card.Img variant="top" src={drink.strDrinkThumb} />
//                   <Card.Body>
//                     <Card.Title>{drink.strDrink}</Card.Title>

//                     <Button onClick={() => {this.addDrinkM(drink)}} variant="primary">Add To Fav</Button>
//                   </Card.Body>
//                 </Card>

//               </>
//             )
//           })
//         }

//       </>
//     )
//   }
// }

// export default withAuth0(Home);







//=================================================================================================1==========================================
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import axios from 'axios';
import {Card,Button} from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';

class MyFavoriteBooks extends React.Component {

  constructor(props){
    super(props);

    this.state={
      allDrinks:[],   
    }
  }

  componentDidMount (){
    axios
   // .get(`http://localhost:3008/getallDrinks`)
    .get(`${process.env.HEROKU_SERVER}/getallDrinks`)
    .then( result =>{
      this.setState({
        allDrinks: result.data,
      })
    }).catch(err=>{console.log(err)})
  } 

 addDrinkM = (drinkObj) => {
  const {user} =this.props.auth0;

  // const newDrink={
  //   drinkName: drinkObj.strDrink, // same schema order
  //   drinkImg: drinkObj.strDrinkThumb,
  // }
  // const params ={
  //   userEmail: user.email,
  //   drinkObj: newDrink,
  // }

  const params={
    userEmail: user.email,
    drinkObj: {
      drinkName: drinkObj.strDrink,
      drinkImg: drinkObj.strDrinkThumb
    }
  }
  axios
  // .post(`http://localhost:3008/addDrink`,params)
  .post(`${process.env.HEROKU_SERVER}/addDrink`,params)
  .catch(err=> {console.log(err)})
 }

  render() {
    return(
   <>
   {this.state.allDrinks.length && this.state.allDrinks.map((drink,idx)=>{
     return(
     <>
      <Card style={{ width: '18rem' , display:'inline-block'}}>
     <Card.Img variant="top" src={drink.strDrinkThumb} />
     <Card.Body>
       <Card.Title>{drink.strDrink}</Card.Title>

       <Button onClick={ () => {this.addDrinkM(drink) }} variant="primary">Add to Fav</Button>
     </Card.Body>
   </Card>
     </>
     )

   })}

   </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
