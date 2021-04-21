import Typography from "@material-ui/core/Typography";
import "fontsource-roboto";

const About = () => {
  return (
    <div style={{ margin: "5% 20%" }}>
      <Typography variant="h3">Informasjon om RoadBuddy</Typography>
      <br />
      <Typography variant="h5">
        {" "}
        RoadBuddy er et verktøy som kan brukes av alle sjåfører for å få
        informasjon om kjøreforholdene langs strekningen de planlegger å kjøre
      </Typography>
      <br />
      <Typography variant="h5">
        Alt du trenger å gjøre er å skrive inn hvor du skal reise fra, og hvor
        du skal reise til, så får du en detaljert beskrivelse av alle ting du
        bør være klar over langs kjøreruten.
      </Typography>
      <br />
      <Typography variant="h5">
        Disse inkluderer for øyeblikket været ved startsted og destinasjon,
        trafikkmeldinger, og om det kan være glatt føre.
      </Typography>
    </div>
  );
};

export default About;
