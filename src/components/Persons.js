import Person from "./Person"
import styles from "./Persons.module.css"

import { Divider, Grid } from "@mui/material";


const Persons = (props) => {
  return (
    <div>
      <div className={styles.gridContainer}>
        <Grid
          container
          spacing={3}
          direction="row"
          className={styles.grid}

        >
          {props.peopleToShow.map(person =>
            <Grid
              item key={person.id}>
              <Person
                name={person.name}
                number={person.number}
                deletePerson={() => props.deletePerson(person.id)}
              />
            </Grid>
          )}

        </Grid>

      </div>

    </div>
  )
}

export default Persons
