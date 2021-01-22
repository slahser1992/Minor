import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'

import EssayCard from '@/components/Card';
import Link from '@/components/atoms/Link';
import { GET_ESSAYS } from '@/gql/essay';
import { useEssayStores, useQuery } from '@/hooks';

const useStyles = makeStyles((theme) => ({
	root: {
    flexGrow: 1,
  },
}));

const Home = observer(() => {
	const essayStore = useEssayStores();
	const classes = useStyles();
	
	useQuery({
		query: GET_ESSAYS,
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
		</div>
	);
});

export default Home;