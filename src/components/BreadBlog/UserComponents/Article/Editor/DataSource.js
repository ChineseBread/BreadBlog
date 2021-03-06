// https://getemoji.com/
const emojis = [
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐คฃ',
	'๐ค',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐ฅฐ',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐คช',
	'๐คจ',
	'๐ง',
	'๐ค',
	'๐',
	'๐คฉ',
	'๐ฅณ',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐',
	'๐ป',
	'๐ฃ',
	'๐',
	'๐ซ',
	'๐ฉ',
	'๐ฅบ',
	'๐ข',
	'๐ญ',
	'๐ค',
	'๐ ',
	'๐ก',
	'๐คฌ',
	'๐คฏ',
	'๐ณ',
    '๐',
    '๐ค',
    '๐',
	'๐',
	'๐',
	'๐',
	'๐ค',
	'๐',
	'๐',
	'๐',
	'โค',
	'โญ',
	'โ',
    'โ๏ธ',
    '๐ค',
    'โ๏ธ',
    'โ๏ธ',
    '๐ง',
    '๐จ'
];
const MarkDownExtension = {
	name: 'MarkExtension',
	level: 'inline',
	start: (text) => text.match(/@[^@]/)?.index,
	tokenizer(text) {
		const reg = /^@([^@]*)@/;
		const match = reg.exec(text);

		if (match) {
			const token = {
				type: 'MarkExtension',
				raw: match[0],
				text: match[1].trim(),
				tokens: []
			};

			return token;
		}
	},
	renderer(token) {
		return `<mark>${token.text}</mark>`;
	}
};

const toolbars = [
	'bold',
	'underline',
	'italic',
	'strikeThrough',
	'-',
	'title',
	'sub',
	'sup',
	'quote',
	'unorderedList',
	'orderedList',
	'-',
	'codeRow',
	'code',
	'link',
	'image',
	'table',
	'mermaid',
	'katex',
	'ๆ ่ฎฐ',
	"emoji",
	0,
	1,
	'-',
	'revoke',
	'next',
	// 'save',
	'=',
	'prettier',
	// 'pageFullscreen',
	// 'fullscreen',
	'preview',
	'htmlPreview',
	'catalog',
	// 'github'
]

// const CDN = {
// 	highlightJs:'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js',
// 	highlightCss:'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark.min.css',
// 	prettierCDN:'https://cdnjs.cloudflare.com/ajax/libs/prettier/2.6.2/standalone.js',
// 	prettierMDCDN:'https://cdnjs.cloudflare.com/ajax/libs/prettier/2.6.2/parser-markdown.min.js',
// 	cropperCss:'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.css',
// 	cropperJs:'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.js',
// 	// iconfontJs:'',
// 	screenfullJs:'https://cdnjs.cloudflare.com/ajax/libs/screenfull.js/5.2.0/screenfull.min.js',
// 	mermaidJs:'https://cdnjs.cloudflare.com/ajax/libs/mermaid/9.1.1/mermaid.min.js',
// 	katexJs:'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.15.3/katex.min.js',
// 	katexCss:'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.15.3/katex.min.css'
// }
export {MarkDownExtension,emojis,toolbars}