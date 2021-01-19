import { gql } from '@apollo/client';

export const GET_ALL_USER = gql`
	query findAllUser {
		findAllUser {
			name
			age
			gender
		}
	}
`;

export const GET_PROFILE = gql`
	query profile {
		profile {
			_id
			name
			email
		}
	}
`

export const SIGN_IN = gql`
	mutation loginUser($user: LoginUserInput!) {
		loginUser(user: $user) {
			name
			age
			gender
			token
		}
	}
`