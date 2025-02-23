/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class'],
  theme: {
  	extend: {
  		colors: {
  			accent: '#F84178',
  			blue: '#0067FF',
  			// dark: '#252539',
				dark: 'rgb(17, 24, 39)',
				'dark-border':'rgb(55,65,81)',
				'dark-card': '#1f2937',
  			'card-1': '#FFDAA7',
  			'card-2': '#DDD4FB',
  			'card-3': '#BEF0C7'
  		},
			maxWidth:{
				'8xl': '1560px'
			},
  		spacing: {
  			'128': '32rem',
  			'144': '36rem'
  		},
  		borderRadius: {
  			'4xl': '2rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			poppins: [
  				'Poppins',
  				'sans-serif'
  			],
  			manrope: [
  				'Manrope',
  				'sans-serif'
  			]
  		},
  		screens: {
  			xs: '475px',
  			'3xl': '1920px'
  		},
  		container: {
  			center: true,
  			padding: {
  				DEFAULT: '1rem',
  				sm: '2rem',
  				lg: '4rem',
  				xl: '5rem',
  				'2xl': '6rem'
  			}
  		},
		fontSize:{
			small: '8px'
		}
  	},
  },
//   plugins: [
//     require('@tailwindcss/forms'),
//     require('@tailwindcss/typography'),
//     require('@tailwindcss/aspect-ratio'),
//       require("tailwindcss-animate")
// ],
}
