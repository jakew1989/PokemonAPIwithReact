import logo from './logo.png';
import pokemonLogo from './pokemonLogo.png';
import './App.css';
// import MyItem from './MyItem'

import React from 'react';
class Pokemon extends React.Component {

  constructor() {
    super()
    this.state = {
      imageURL: {logo},
      name: null,
      height: null,
      weight: null,
      type: null,
      baseExperience: null,
      keyMove1: null,
      keyMove2: null,
      loadedCharacter: false,
    }
  }

  getNewCharacter() {
    document.getElementById("pokeball").style.display = 'none';
    const randomNumber = Math.round(Math.random() * 1010)
    const url = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
    fetch(url)
      .then(response => response.json())
      .catch(err => alert(err))
      .then(data => {
      
        console.log(data)

        // console.log(data)
        this.setState({
          imageURL: (data["sprites"]["front_default"]),
          name: data.name,
          height: data.height,
          weight: data.weight,
          type: (data["types"][0]["type"]["name"]),
          baseExperience: data.base_experience,
          keyMove1: (data["abilities"][0]["ability"]["name"]),
      
          loadedCharacter: true,
        })

        try {
          this.setState ({
            keyMove2: (data["abilities"][1]["ability"]["name"])
          })
        }
        
        catch(err) {
          console.log("could not read ability 1")
        }
      })

  }


  render() {
    return (
      <div className='outerContainer'>
        <img src={pokemonLogo} alt="pokemon Logo" id="pokemonLogo" />
        {
          this.state.loadedCharacter &&
            <div className='innerContainer'>
                <div className='pokemonSprite'>
                <img className = "img" 
                src={this.state.imageURL}   
                alt="Pokemon"></img>
                </div>
              
              
                <div className='pokemonStats'>
                  <h1>{this.state.name}</h1>
                  <p>Height: {this.state.height}</p>
                  <p>Weight: {this.state.weight}</p>
                  <p>Type: {this.state.type}</p>
                  <p>Base Experience: {this.state.baseExperience}</p>
                  <ul>
                    <li>Attack 1: {this.state.keyMove1}</li>
                    <li>Attack 2: {this.state.keyMove2}</li>
                  </ul>
                </div>
                
            </div>
        }
        
        <div className='buttonContainer'>
        <img src={logo} alt="pokeball" id="pokeball" />
          <button 
            type="button" 
            className='btn' 
            onClick={() => this.getNewCharacter()}>
            Randomize Pokemon
          </button> 
        </div>
                          
      </div>
      
    )
  }
}


function App() {
  return (
    <div className="App">
        <Pokemon />
    </div>
  );
}

export default App;
