const colorsZinc = {
  50: '#FFFFFF',
  100: '#F8F9FC',
  150: '#EDF1F7',
  200: '#E2E9F3',
  250: '#C6D3E7',
  300: '#A0AFC5',
  350: '#67778E',
  400: '#383E50',
  500: '#2A3041',
  550: '#212738',
  600: '#1A2031',
  650: '#151B2B',
  700: '#101420',
  800: '#0B0E16',
  900: '#000000',
}

const colorsIndigo = {
  50: '#F2F3FE',
  100: '#E0DDFC',
  200: '#C2BCFA',
  300: '#A097F2',
  400: '#847AE6',
  500: '#5B50D6',
  600: '#433AB8',
  700: '#2F289A',
  800: '#1F197C',
  900: '#130F66',
}

const slideEntrances = () => {
  const genSlide = (suffix, offset) => ({
    [`slidein-up-${suffix}`]: {
      from: { transform: `translateY(${offset})` },
      to: { transform: 'translateY(0)' },
    },
    [`slidein-left-${suffix}`]: {
      from: { transform: `translateX(-${offset})` },
      to: { transform: 'translateX(0)' },
    },
    [`slidein-right-${suffix}`]: {
      from: { transform: `translateX(${offset})` },
      to: { transform: 'translateX(0)' },
    },
    [`slidein-down-${suffix}`]: {
      from: { transform: `translateY(-${offset})` },
      to: { transform: 'translateY(0)' },
    },
  })
  return {
    ...genSlide('sm', '4px'),
    ...genSlide('md', '8px'),
  }
}

const slideExits = () => {
  const genSlide = (suffix, offset) => ({
    [`slideout-up-${suffix}`]: {
      from: { transform: 'translateY(0)' },
      to: { transform: `translateY(-${offset})` },
    },
    [`slideout-left-${suffix}`]: {
      from: { transform: 'translateX(0)' },
      to: { transform: `translateX(-${offset})` },
    },
    [`slideout-right-${suffix}`]: {
      from: { transform: 'translateX(0)' },
      to: { transform: `translateX(${offset})` },
    },
    [`slideout-down-${suffix}`]: {
      from: { transform: 'translateY(0)' },
      to: { transform: `translateY(${offset})` },
    },
  })
  return {
    ...genSlide('sm', '4px'),
    ...genSlide('md', '8px'),
  }
}

const easingFunctions = {
  // https://gist.github.com/argyleink/36e1c0153d2a783d513bd29c9f25aaf2
  'ease-in-quad': 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  'ease-out-quad': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  'ease-out-quart': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
}


/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
			transitionProperty: {
        label: 'transform, font-size',
      },
      spacing: {
        'right-help-sidebar': '22.5rem',
        'navbar-height': '4rem',
      },
      maxWidth: {
        'content-with-navigation-left': '44.5rem',
      },
      minHeight: {
        'page-container': 'calc(100vh - theme(spacing.navbar-height))',
        'page-container-wbanner': 'calc(100vh - theme(spacing.navbar-height) - 40px)',
        'page-container-wprogressbar': 'calc(100vh - theme(spacing.navbar-height) - 6px)',
      },
			fontFamily: {
        sans: ['Roboto', 'Helvetica', 'sans-serif'],
        code: ['Hack', 'sans-serif'],
        icons: ['FontAwesome'],
      },
			fontSize: {
        '3xs': [
          '0.5rem',
          {
            lineHeight: '1rem',
          },
        ],
        '2xs': [
          '0.625rem',
          {
            lineHeight: '1rem',
          },
        ],
        xs: [
          '0.75rem',
          {
            lineHeight: '1rem',
            letterSpacing: '0.002em',
          },
        ],
        ssm: [
          '0.8125rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '0.0025em',
          },
        ],
        sm: [
          '0.875rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '0.0025em',
          },
        ],
        base: [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0.005em',
          },
        ],
        lg: [
          '1.25rem',
          {
            lineHeight: '1.75rem',
          },
        ],
      },
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))',
				},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
				brand: colorsIndigo,
        indigo: colorsIndigo,
        purple: {
          50: '#FCF4FF',
          100: '#F7DFFE',
          200: '#EDC0FD',
          300: '#DDA0FA',
          400: '#CB87F6',
          500: '#B160F0',
          600: '#8B46CE',
          700: '#6830AC',
          800: '#491E8B',
          900: '#331273',
        },
        sky: {
          50: '#ECFBFE',
          100: '#CAF5FD',
          200: '#96E6FB',
          300: '#61CDF4',
          400: '#3AB0E9',
          500: '#009EDD',
          600: '#0068BC',
          700: '#004E9D',
          800: '#00377F',
          900: '#002769',
        },
        teal: {
          50: '#F2FEFB',
          100: '#DAFCF4',
          200: '#B6FAEF',
          300: '#8EF2EA',
          400: '#6FE5E5',
          500: '#43C9D5',
          600: '#30A1B7',
          700: '#217B99',
          800: '#155A7B',
          900: '#0C4166',
        },
        green: {
          50: '#F2FEF2',
          100: '#DAFCDA',
          200: '#B7F9BE',
          300: '#8FEEA2',
          400: '#70DE91',
          500: '#44C979',
          600: '#31AC6F',
          700: '#229064',
          800: '#157457',
          900: '#0D604F',
        },
        orange: {
          50: '#FFF9ED',
          100: '#FFEFCC',
          200: '#FFDA99',
          300: '#FFC066',
          400: '#FFA63F',
          500: '#FF7C00',
          600: '#DB5F00',
          700: '#B74600',
          800: '#933100',
          900: '#7A2200',
        },
        yellow: {
          50: '#FFFDED',
          100: '#FEF8CC',
          200: '#FDEE9A',
          300: '#FBE267',
          400: '#F8D441',
          500: '#F4C004',
          600: '#D1A002',
          700: '#AF8202',
          800: '#8D6501',
          900: '#755100',
        },
        red: {
          50: '#FFFAF6',
          100: '#FFEBD8',
          200: '#FFD1B2',
          300: '#FFB28C',
          400: '#FF946F',
          500: '#FF6240',
          600: '#DB402E',
          700: '#B72420',
          800: '#93141A',
          900: '#7A0C1A',
        },
        zink: colorsZinc,
        neutral: colorsZinc,
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

