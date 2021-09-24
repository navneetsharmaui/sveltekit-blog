/* jshint esversion: 9 */

const { spacing, fontFamily } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

const backfaceVisibility = plugin(({ addUtilities }) => {
	addUtilities({
		'.backface-visibile': {
			'backface-visibility': 'visible',
		},
		'.backface-hidden': {
			'backface-visibility': 'hidden',
		},
	});
});

const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'blue-opaque': 'rgb(13 42 148 / 18%)',
			},
			fontFamily: {
				sans: ['Raleway', ...fontFamily.sans],
				display: ['Raleway', ...fontFamily.sans],
				body: ['Raleway', ...fontFamily.sans],
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.gray.700'),
						a: {
							color: theme('colors.blue.500'),
							'&:hover': {
								color: theme('colors.blue.700'),
							},
							code: { color: theme('colors.blue.400') },
						},
						'h2,h3,h4': {
							'scroll-margin-top': spacing[32],
						},
						code: { color: theme('colors.pink.500') },
						'blockquote p:first-of-type::before': false,
						'blockquote p:last-of-type::after': false,
					},
				},
				dark: {
					css: {
						color: theme('colors.gray.300'),
						a: {
							color: theme('colors.blue.400'),
							'&:hover': {
								color: theme('colors.blue.600'),
							},
							code: { color: theme('colors.blue.400') },
						},
						blockquote: {
							borderLeftColor: theme('colors.gray.700'),
							color: theme('colors.gray.300'),
						},
						'h2,h3,h4': {
							color: theme('colors.gray.100'),
							'scroll-margin-top': spacing[32],
						},
						hr: { borderColor: theme('colors.gray.700') },
						ol: {
							li: {
								'&:before': { color: theme('colors.gray.500') },
							},
						},
						ul: {
							li: {
								'&:before': { backgroundColor: theme('colors.gray.500') },
							},
						},
						strong: { color: theme('colors.gray.300') },
						thead: {
							color: theme('colors.gray.100'),
						},
						tbody: {
							tr: {
								borderBottomColor: theme('colors.gray.700'),
							},
						},
					},
				},
			}),
		},
		boxShadow: {
			sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
			DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
			md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
			lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
			xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
			'2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
			'3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
			inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
			dark: '0 1px 3px 0 rgba(216, 214, 214, 0.1), 0 1px 2px 0 rgba(216, 214, 214, 0.06)',
			'dark-lg': '0 10px 15px -3px rgba(216, 214, 214, 0.1), 0 4px 6px -2px rgba(216, 214, 214, 0.05)',
			none: 'none',
		},
	},
	variants: {
		typography: ['dark'],
		extend: {
			listStyleType: ['hover', 'focus'],
			listStylePosition: ['hover', 'focus'],
			boxShadow: ['dark'],
		},
	},
	plugins: [require('@tailwindcss/typography'), backfaceVisibility],
};

module.exports = config;
