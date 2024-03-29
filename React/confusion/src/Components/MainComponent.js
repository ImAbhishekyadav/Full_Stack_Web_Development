import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Foooter from './FooterComponent';
import Menu from './MenuComponent';
import About from './AboutComponent';
import Contact from './ContactComponent'
import DishDetail from './DishdetailComponent'
import { Switch,Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions:state.promotions,
    leaders: state.leaders
  }
}
class Main extends Component{

  

  render(){
    const HomePage = ()=>{
      return(
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }

    const DishWithId = ({match})=>{
      return(
        <DishDetail dish ={this.props.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId,10))[0]}
        comments={this.props.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId,10))[0]}
        />
      );
    }

  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route path="/home" component={HomePage}/>
        <Route exact path="/menu" component = {()=> <Menu dishes = {this.props.dishes}/>}/>
        <Route exact path="/about" component={()=> <About leaders = {this.props.leaders}/>}/>
        <Route path="/menu/:dishId"  component={DishWithId} />
        <Route exact path="/contact" component = {Contact}/>
        <Redirect to="/home"/>
      </Switch>
      <Foooter/>
     </div>
  );
}
}



export default withRouter(connect (mapStateToProps)(Main));
