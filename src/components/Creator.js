import React, {useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// import Favorite from './Favorite';
import setAuthToken from '../utils/setAuthToken'
// import Card from './Card'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

function Creator() {
  const [creators, setCreator] = useState([]);
  const [q, setQ]= useState('')
  const [redirect, setRedirect]= useState(false)
  const handleChange = event => {
    setQ(event.target.value);
  }
const handleSubmit = (e) => {
  setAuthToken(localStorage.getItem('jwtToken'))
    e.preventDefault();
    const searchTerm = {q}
    axios.post(`${REACT_APP_SERVER_URL}/creators/results`, searchTerm)
    .then(response => {
      console.log(response.data)
      setCreator(response.data.creators)
    })
    .catch(error => console.log(error))
  }
  // const showCreators = () => {
  //   console.log(creators)
  //   if(creators.length) {
  //     let creatorsArray= creators.map((creator) => (
  //       <Card
  //       key={creator}
  //       name={creator.name}
  //       bio={creator.bio}
  //     />
  //     ))
  //     return {creatorsArray}
  //   }else{
  //     return <h1> There are no flights</h1>
  //   }

   //} 
  function addToFavorite( pcid, name, bio, location, imageUrl) {
    setAuthToken(localStorage.getItem('jwtToken'))
    axios({
      method: 'post',
      url: `${REACT_APP_SERVER_URL}/users/AddFavorites`,
      data: {
        pcid: pcid,
        name: name, 
        bio:bio,
        location: location,
        imageUrl: imageUrl
      }
    }).then(response => {
      console.log(response)
      setRedirect(true)
      // setFavorites(response.data.creator)
      // console.log(favorites)
    })
    .catch(error => console.log(error));
  }
if (redirect) return <Redirect to="/favorite" />
  return (
  <div>
    <form onSubmit={handleSubmit}  action="/creators/results" method= 'POST' className="form-inline">
        <label htmlFor="q">Search</label>
        <input value={q} onChange={handleChange} id="q"className="form-control mr-sm-2" type="search" placeholder="Creator" aria-label="Search"/>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form>

    <h1>Your results</h1>
      <div>
        {creators.map((creator, idx) => ( 
          <div className= 'result' key={idx}> 
            <div key={creator.name}>  <img src={creator.imageUrl} width='60px' alt='creator'/> 
            <strong>{creator.name}</strong>
            <br></br>
            <em>{creator.bio}</em>
            <br></br>
             <b>{creator.location}</b>
             </div>
            <button onClick={()=>{addToFavorite(creator.pcid, creator.name, creator.bio, creator.location)}} type="button" className= 'button'>Add To Favorites</button>
            {/* <AddtoFav addToFavList={addToFavList} name={creator.name} bio={creator.bio} location={creator.location}/> */}
          </div>
        ))}
     </div> 
  </div>   
       
  )
  }

  export default Creator;