import React, {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getPlats, postNewGame } from '../../actions';
import "./Create.css"


export function Create(props) {
  const dispatch = useDispatch();
  
  useEffect(()=>{
        dispatch(getPlats())
        dispatch(getGenres())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    const [genreToAdd, setGenreToAdd] = useState('');    
    const [platformToAdd, setPlatformToAdd] = useState('');
    
    
    
    
    const [state, setState] = useState({
      name: '',
      description: '',
      released: '',
      rating:'',      
      genres: [],
      platforms: [],
      newGenres:[],
      newPlatforms:[]
      
    })
    
    const reduxGenres = useSelector(state => state.Genres);
    const reduxPlatforms = useSelector(state => state.Platforms);
    
    
    const [checkedGenreState, setCheckedGenreState] = useState([]);
    const [checkedPlatformState, setCheckedPlatformState] = useState([]);

    useEffect(()=>{
      let val = new Array(reduxGenres.length).fill(false);
      setCheckedGenreState(val)
    },[reduxGenres])
    
    
    // let updatedCheckedState;

    const handleGenresOnCheck = (genreId, position) => {
      if(checkedGenreState[position]=== true) {
        checkedGenreState[position] = !checkedGenreState[position]

        let nuevoArr = state.genres.filter((item)=> item !== genreId )
        setState({
          ...state,
          genres: nuevoArr
        })
      } else {
        checkedGenreState[position] = !checkedGenreState[position];
        setState({
          ...state,
          genres: [...state.genres, genreId]
        })
      }
      console.log(state)
    }
    
    const handlePlatformsOnCheck = (platformId, position) => {
      if(checkedPlatformState[position]=== true) {
        checkedPlatformState[position] = !checkedPlatformState[position]

        let nuevoArr = state.platforms.filter((item)=> item !== platformId )
        setState({
          ...state,
          platforms: nuevoArr
        })
      } else {
        checkedPlatformState[position] = !checkedPlatformState[position];
        setState({
          ...state,
          platforms: [...state.platforms, platformId]
        })
      }
      console.log(state)
    }

  function handleChange(e) {
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
  }


  function addNewGenre(gen){
      let genreValues = state.newGenres;
      genreValues.push(gen)
      setState({
        ...state,
        newGenres: genreValues
      })
      console.log(state)
  }
  function addNewPlatform(plat){
      let platsValues = state.newPlatforms;
      platsValues.push(plat)
      setState({
        ...state,
        newPlatforms: platsValues
      })
      console.log(state)
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    console.log(state)
    dispatch(postNewGame(state))
  }

  

  return (
    <div className="form">
    <h3 className ="title" >Create Your Game</h3>
    <form  onSubmit ={(e)=> handleSubmit(e) }>

      <label>Name</label>
      <input className="input-container" type="text" placeholder="Mia's Game" name = "name" value = {state.name} onChange={(e)=> handleChange(e) }></input>

      <div class="cut"></div>

      <label>Description</label>
      <input className="input-container" name = "description" placeholder="Describe it" value = {state.description} onChange={(e)=> handleChange(e) }></input>
      

      <label>Released</label>
      <input className="input-container" name = "released" placeholder="Date of release" value = {state.released} onChange={(e)=> handleChange(e) }></input>
      

      <label>Rating</label>
      <input className="input-container"  type="text" placeholder="Rank it" name = "rating" value = {state.rating} onChange={(e)=> handleChange(e) }></input>

      <label>Genres</label>
      <div className="genres" >
        {
          reduxGenres.map((item,index)=>{
            return(
              <li key={index}>
                <input
                  type="checkbox"
                  id={item.id}
                  name={item.name}
                  value={item.name}
                  onChange = {()=>handleGenresOnCheck(item.id, index)}
                ></input>
                {item.name}
              </li>
            )
          })
        }
      </div>
      <label>New Genre</label>
      <input className="input-container" type="text" name = "genreToAdd" value = {genreToAdd} onChange={(e)=> setGenreToAdd(e.target.value) }></input>
      <button onClick = {(e)=>{
        e.preventDefault();
        addNewGenre(genreToAdd)}}>Add Genre</button>
      
      <label>Platforms</label>
      <div className="platforms" >
        {
          reduxPlatforms.map((item,index)=>{
            return(
              <li key={index}>
                <input
                  type="checkbox"
                  id={item.id}
                  name={item.name}
                  value={item.name}
                  onChange = {()=>handlePlatformsOnCheck(item.id, index)}
                ></input>
                {item.name}
              </li>
            )
          })
        }
      </div>
      <label>New Platform</label>
      <input className="input-container" type="text" name = "platfomrToAdd" value = {platformToAdd} onChange={(e)=> setPlatformToAdd(e.target.value) }></input>
      <button onClick = {(e)=>{
        e.preventDefault();
        addNewPlatform(platformToAdd)}}>Add Platform</button>



      <button className="submit" type = "submit">Create</button>
    </form>
    </div>
  )
};

// export default connect(null, {addTodo})(Create)
export default (Create)