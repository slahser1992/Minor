import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	avatar: {
		backgroundColor: theme.palette.common.crimson,
	},
	media: {
		height: 0,
		paddingTop: '56.25%'
	}
}))

function EssayCard({ title, content, postTime }) {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar
						aria-label="recipe"
						className={classes.avatar}
					>
						R
					</Avatar>
				}
				title={title}
				subheader={postTime}
			/>
			<CardMedia
				className={classes.media}
				title="Paella dish"
				image={"/test.png"}
			/>
			<CardContent>
				<Typography variant={"body2"} color={"textSecondary"} component={"p"}>
					{content}
				</Typography>
			</CardContent>
		</Card>
	)
}

export default EssayCard;