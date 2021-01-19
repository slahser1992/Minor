import { gql } from '@apollo/client';

export const POST_ESSAY = gql`
	mutation postEssay($essay: EssayInput!) {
		postEssay(essay: $essay) {
			content
			title
		}
	}
`;

export const GET_ESSAY = gql`
	query findEssay {
		findEssay {
			_id
			title
			content
			postTime
			author {
				name
			}
		}
	}
`;