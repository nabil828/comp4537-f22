import Heading from "./Heading.js"
// import Rest from "./Rest.js"
import {Route,Switch, Link} from "react-router-dom"
import {useState, useEffect} from 'react'


function Card(props){
  const [city, setCity] = useState(null);
  console.log("props.name" + props.name);
  useEffect( () => {
    fetch("/cities/" + props.name)
    .then(response => response.json())
    .then(data => setCity(data[0]))
  },[props.name]
  )


  console.log(city);
      if(city){
        return (
          <>
            <h1> {city.name} </h1>
            <ul>
              <li> Temperature: {city.temperature}</li>
              <li> Description: {city.description}</li>
            </ul>
          </>
        );
      }else
      return <h1> No User</h1>

}
function App() {
  return (
    <div>
      <Heading/>

      Select a city:
      <ul>
        <li><Link to="/Vancouver"> Vancouver </Link> </li>
        <li><Link to="/Tokyo"> Tokyo </Link> </li>
      </ul>

        <Switch>
        <Route
          path="/Vancouver"
          render={(props) => (
             <Card name='Vancouver' temperature="25.6" description="sunny"/>
           )}
        />
        <Route
          path="/Tokyo"
          render={(props) => (
             <Card name='Tokyo' temperature="30.6" description="scorching"/>
           )}
        />

      </Switch>
    </div>

  );
}
export default App;
