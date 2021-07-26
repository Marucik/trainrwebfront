import {
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "./utils/api/axiosFactory";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  list: {
    width: "content",
    maxWidth: 560,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  root: {
    width: "100%",
    height: "100vh",
    backgroundColor: theme.palette.background.default,
  },
}));

function App() {
  const [connections, setConnections] = useState([]);
  const [departures, setDepartures] = useState([]);
  const classes = useStyles();

  const getConnections = async () => {
    const response = await axios.get("/connections");
    setConnections(response.data);
  };

  const getDepartures = async (startId) => {
    const response = await axios.get(`/departures/${startId}`);

    setDepartures(response.data);
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <Grid
      container
      direction="column"
      // justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <List className={classes.list}>
        {connections.map((connection) => (
          <ListItem
            key={connection.startId}
            button
            onClick={() => {
              getDepartures(connection.startId);
            }}
          >
            <ListItemText
              primary={`${connection.start} => ${connection.destination}`}
            />
          </ListItem>
        ))}
      </List>
      <Grid style={{ marginTop: "2rem" }}>
        {departures.length > 0 ? (
          <List className={classes.list}>
            {departures.map((departure) => (
              <ListItem button>
                <ListItemText
                  primary={`[${departure.departure}] ${departure.from} -- ${(
                    departure.travelTime / 60
                  ).toFixed(1)}h --> ${departure.to} (${departure.train})`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <h2 style={{ color: "white" }}>Brak odjazdów</h2>
        )}
      </Grid>
    </Grid>
  );
}

export default App;
