import logo from './logo.svg';
import TemperatureDisplay from './components/TemperatureDisplay'
import RunButton from './components/RunButton'
import TravelForm from './components/DestinationForm'


const App = () => {
  return (
    <div>
      <TemperatureDisplay/>
      <TravelForm/>
      <RunButton/>

    </div>
  )
}

export default App;
