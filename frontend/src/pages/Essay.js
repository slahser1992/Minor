import { useParams } from 'react-router-dom';

import { useQuery } from '@/hooks';
import { GET_ONE_ESSAY } from '@/gql/essay';
import Marked from '@/components/atoms/Marked';

function Essay() {
	// const essayStore = useEssayStores();
	const { essayId } = useParams();
	console.log(essayId);

	const { data, loading, error } = useQuery({
		query: GET_ONE_ESSAY,
		variables: {
			id: essayId,
		},
		// sucCallback: (res) => essayStore.updateEssays(res),
		options: {
			hideSnackbar: true
		}
	});
	if (loading) return null;
	if (error) return `Error! ${error}`;

	const { findOneEssay: { content } } = data;
	

  return (
		<div>
			<Marked htmlStr={content}/>
    </div>
  );
}

export default Essay;