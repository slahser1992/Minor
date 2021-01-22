import marked from 'marked';
import hljs from 'highlight.js';
import './marked.css';
import { useEffect } from 'react';
import 'highlight.js/styles/a11y-dark.css';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.initHighlightingOnLoad();
hljs.registerLanguage('javascript', javascript);

function Marked({ htmlStr }) {
	const html = marked(htmlStr);
	useEffect(() => {
		document.querySelectorAll('pre code').forEach(block => {
			// console.log(block);
			hljs.highlightBlock(block);
		});
	}, []);
	return (
		<div dangerouslySetInnerHTML={{ __html: html }} id={"markdown-wrapper"} />
	);
}

export default Marked;