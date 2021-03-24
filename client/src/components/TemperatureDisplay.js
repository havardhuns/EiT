const TemperatureDisplay = (props) => {
  return (
    <div>
      Temperature {props.time} at {props.place}: {props.temperature} °C
    </div>
  );
};

export default TemperatureDisplay;
