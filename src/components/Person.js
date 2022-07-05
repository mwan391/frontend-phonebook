import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import styles from "./Person.module.css"


const Person = (props) => {
	return (
		<Card>
			<CardContent className={styles.cardContent}>
				{`${props.name} ${props.number}`}
				<PersonOutlineIcon />
			</CardContent>
			<button onClick={props.deletePerson}>delete</button>
		</Card>
	)
}
export default Person