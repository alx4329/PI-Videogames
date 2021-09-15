import React, {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getPlats, postNewGame } from '../../actions';
import "./Create.css"
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'


export function Create(props) {
  const dispatch = useDispatch();
  
  useEffect(()=>{
        dispatch(getPlats())
        dispatch(getGenres())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    const [genreToAdd, setGenreToAdd] = useState('');    
    const [platformToAdd, setPlatformToAdd] = useState('');
    const [errors, setErrors] = useState({});
    
    const date  = new Date("17","10","2019");
    
    const [state, setState] = useState({
      name: '',
      description: '',
      released: date,
      rating:'',      
      genres: [],
      platforms: [],
      newGenres:[],
      newPlatforms:[]
      
    })
    
    const reduxGenres = useSelector(state => state.Genres);
    const reduxPlatforms = useSelector(state => state.Platforms);
    
    
    // eslint-disable-next-line no-unused-vars
    const [checkedGenreState, setCheckedGenreState] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [checkedPlatformState, setCheckedPlatformState] = useState([]);

    // useEffect(()=>{
    //   let val = new Array(reduxGenres.length).fill(false);
    //   setCheckedGenreState(val)
    // },[reduxGenres])
    
    
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
      
      
    }
    
    const handlePlatformsOnCheck = (platformId, position) => {
      // console.log(checkedPlatformState[position])
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
      // console.log(checkedPlatformState[position])
      
    }

  function handleChange(e) {
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
    setErrors(validate({
      ...state,
      [e.target.name]: e.target.value
    }))
  }


  function addNewGenre(gen){
      let genreValues = state.newGenres;
      genreValues.push(gen)
      setState({
        ...state,
        newGenres: genreValues
      })
      alert("Genre Added!")
  }
  function addNewPlatform(plat){
      let platsValues = state.newPlatforms;
      platsValues.push(plat)
      setState({
        ...state,
        newPlatforms: platsValues
      })
      alert("Platform Added!")
  }

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(postNewGame(state)).then(()=> alert("Game Created"))
  }
  // function handleDateSelect(date){

  // }
  

  return (
    <div className= "formContainer">
      
          <h3 className ="title" >Create Your Game</h3>
      <div className="form">
        <form className="items" onSubmit={(e)=> {handleSubmit(e)} }>
          <div className='item'>
            <label>Name:</label>
            <input className="input-container" type="text" placeholder="Mia's Game" name = "name" value = {state.name} onChange={(e)=> handleChange(e) }></input>

          </div>
          <div className='item-double'>
          <div className='item'>
            <label>Released:</label>
            <input type="date" className='input-container'/>

          </div>
          <div className='item'>
            <label>Rating:</label>
            <input className={errors.rating ? 'danger' : 'input-container'}  type="text" placeholder="Rank it" name = "rating" value = {state.rating} onChange={(e)=> handleChange(e) }/>{errors.rating &&(<p className='danger'>{errors.rating}</p>)}

          </div>
          </div>
          
          <div className='item'>
            <label>Description:</label>
            <input className="input-container" name = "description" placeholder="Describe it" value = {state.description} onChange={(e)=> handleChange(e) }></input>
          </div>
          

          

          <div className="genres" >
          <label>Genres:</label>
          <div className="checkli">

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
          <label>New Genre:</label>
          <div className = "newProp">

            <input className="input-container" type="text" name = "genreToAdd" value = {genreToAdd} onChange={(e)=> setGenreToAdd(e.target.value) }></input>
            <button className ="add" onClick = {(e)=>{
              e.preventDefault();
              addNewGenre(genreToAdd)}}>Add Genre</button>
          </div>
          </div>
          
          <div className="platforms" >
          <label>Platforms:</label>
          <div className="checkli" >
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
          <label>New Platform:</label>
            <div className="newProp">
              <input className="input-container" type="text" name = "platfomrToAdd" value = {platformToAdd} onChange={(e)=> setPlatformToAdd(e.target.value) }></input>
              <button className="add" onClick = {(e)=>{
                e.preventDefault();
                addNewPlatform(platformToAdd)}}>Add Platform</button>

            </div>
          </div>


          
          <button className="submit" type="submit">Create</button>
        </form>
      </div>
    </div>
  )
};

function validate(status){
  let errors= {};
  // if(!/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(status.released)){
  //    errors.released= 'Must be a valid date: dd/mm/yyyy; dd-mm-yyyy; dd.mm.yyyy';
  // }
  if(!/^([0-4]).([0-9])$/.test(status.rating) && !/^([0-5])$/.test(status.rating) ){    
      errors.rating='Must be a number between 0-5 Ex: 2.3'
  }
  return errors;
}

export default (Create)
