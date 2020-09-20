import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/homeScreen/Home';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import SignIn from './components/SignIn';
import Register from './components/Register';
import AdminDashboard from './components/adminScreen/AdminDashboard';
import ShippingSteps from './components/shippingScreen/ShippingSteps';
import Contact from './components/Contact';
import About from './components/About';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';


function App() {

  
  const PrivateAdminRoute = ({component: Component, ...rest}) => {

    const {userData} = useSelector(state => state.signInUser);

    return <Route {...rest} render={() => (
      userData && userData.isAdmin === true ? <Component /> : <Redirect to={'/'} />
    )} />
  }

  
  return (
    <Router>
      <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/about" component={About}/>
        <Route exact path="/products" component={Products}/>
        <Route path="/products/:id" component={ProductDetails}/>
        <Route path="/cart/:id?" component={Cart}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/register" component={Register}/>
        <PrivateAdminRoute path="/admindashboard" component={AdminDashboard}/>
        <Route path="/shipping" component={ShippingSteps}/>
      </Switch>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
