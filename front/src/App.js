import React, {useEffect, useState} from 'react';
import {Switch, Route, useHistory} from 'react-router-dom'
import PrimarySearchAppBar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Footer from "./components/Footer";
import AlertComponent from "./components/Alert";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";



function App() {
    const history = useHistory()
    const [search, setSearch] = useState('')

    useEffect(() => {
        if(window.location.pathname !== '/products'){
            history.push('/products')
        }
    }, [search])


    return (
    <div className="App">
      <PrimarySearchAppBar search={search} setSearch={setSearch}/>
      <AlertComponent/>
          <Switch>
            <Route path={'/'} exact component={Home}/>
              <Route path={'/products'} exact render={() => <Shop search={search}/>}/>
            <Route path={'/products/:id'} exact component={ProductDetail}/>
            <Route path={'/cart'} exact component={Cart}/>
          </Switch>
        <Footer/>
    </div>
  );
}

export default App;
