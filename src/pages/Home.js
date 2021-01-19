import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'

import EssayCard from '@/components/Card';
import Link from '@/components/atoms/Link';
import { POST_ESSAY, GET_ESSAY } from '@/gql/essay';
import { useMutation, useEssayStores, useQuery } from '@/hooks';
import Button from '@/components/atoms/Button';

const useStyles = makeStyles((theme) => ({
	root: {
    flexGrow: 1,
  },
}));

const Home = observer(() => {

	const essayStore = useEssayStores();
	const classes = useStyles();
	
	const [postEssay] = useMutation({
		mutation: POST_ESSAY,
		sucCallback: (param) => {
			console.log(param);
		}
	});
	
	useQuery({
		query: GET_ESSAY,
		sucCallback: (res) => essayStore.updateEssays(res),
		options: {
			hideSnackbar: true
		}
	});

	return (
		<div>
			<Grid container className={classes.root} spacing={2}>
				{essayStore.essays.map((essay) => (
					<Grid item xs={4} key={essay._id}>
						<Link to={`/essay/${essay._id}`}>
							<EssayCard {...essay}/>
						</Link>
					</Grid>
				))}
			</Grid>
			<Button
				onClick={
					() => postEssay({
						variables: {
							essay: {
								title: "abcd",
								content: "abcd",
							}
						}
					})
				}
			>Post Essay</Button>
		</div>
	);
});

export default Home;