import { memoize, markSearchString } from '@inkline/inkline/src/helpers';

const memoizedMarkSearchString = memoize(markSearchString);

export default {
	name: 'IMark',
	props: {
		text: {
			type: String,
			default: ''
		},
		query: {
			type: String,
			default: ''
		}
	},
	computed: {
		parts() {
			return memoizedMarkSearchString(this.text, this.query);
		}
	}
};
