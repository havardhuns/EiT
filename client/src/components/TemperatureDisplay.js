import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {getTemperature} from '../actions/temperatureActions'

const TemperatureDisplay = props => {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getTemperature())
    }, []) 

    const temperatureData = useSelector(state => state.temperatureReducer)

    return(
        <div>
            Temperature {temperatureData.time} at Gløshaugen: {temperatureData.temperature} °C
        </div>
    )
}

export default TemperatureDisplay