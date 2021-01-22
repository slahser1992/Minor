import { gql } from '@apollo/client';

export const POST_ESSAY = gql`
	mutation postEssay($essay: EssayInput!) {
		postEssay(essay: $essay) {
			content
			title
		}
	}
`;

export const GET_ESSAYS = gql`
	query findEssay {
		findEssay {
			_id
			title
			postTime
			description
			author {
				name
			}
		}
	}
`;

export const GET_ONE_ESSAY = gql`
	query findOneEssay($id: String!) {
		findOneEssay(id: $id) {
			_id
			title
			content
			postTime
			author {
				name
			}
		}
	}
`