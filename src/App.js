import React,{ useEffect, useState} from "react";
import {BrowserRouter as Router,Switch,Route,Link,useRouteMatch,useParams,useLocation,useHistory} from "react-router-dom";
import queryString from 'query-string';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Paper} from'@material-ui/core';
import { Redirect} from "react-router";


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginTop: 50,
      width: '50ch',    
    }, 
    padding:2,
    background: '#273335',
    color: '#D6F3EF',
    
  },
  paper: {
    marginLeft:20,
    color: theme.palette.text.secondary,
    width: 300,
    height: 'auto',
    background: '#2E4C48',
    color: '#D6F3EF',
  },
  Container:{ 
    display: 'block',
    margin: 'auto',    
  },
  grid:{
    margin:10,    
  },
  
}));

function App() {
  const [data, setData] = useState([]); 
  const {search} = useLocation();
  const {category} = queryString.parse(search)
  const classes = useStyles();
  const { id } = useParams();
 
  useEffect(() => {
    axios
      .get(`http://localhost:5000/products`)
      .then((response) => {
        setData (response.data);
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  return (
    <div className={classes.root} >
      <header style={{textAlign:'center'}}>
       <h1>All Products</h1>
      </header>
      <div>
      <Switch>
      <Route path={"products/:id"}>
        {/* <ProductDetails></ProductDetails> */}
      </Route>
      <Route path={"/products"}> 
        {/* <ProductList></ProductList> */}
      </Route>
        <Route exact path="/">
        <Redirect to="/products"></Redirect>
      </Route>
    </Switch>
      </div>
      {data.map((data,idx) => (
      <DataItem key={idx} {...data} />
      ))}
    </div>
    
  );
}
// const navigateToDetails = () => history.push{`/products/${id}`}
const DataItem = ({ id,name,desc,image,category,price})=>{
  const classes = useStyles();
  const {history} = useHistory();
  const filterProductsByCategory = () =>{
    history.push(`/products?category=${category}`)
  }
  return (  
    <div className={classes.root}>
    
      <Grid container spacing={3}  >
        <Grid item xs>
         
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
               <Paper className={classes.paper}>
            <img src={image}  alt=" " style={{width:300,height:180}} />   
            <Grid item className={classes.grid}>
              <h4 >{name}</h4>  
              <p>{desc}</p>
              {category}<br></br>
              ฿{price}
            </Grid>
          </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
   
  
      <br></br>

    </div>
  ) 
}

export default App;
 