module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    'auto-cols-auto', 
    'list-disc',
    { pattern:/bg-./},
    { pattern:/grid-rows-./ },
    { pattern:/grid-cols-./, variants:['md', 'lg']},
    { pattern:/text-.xl/ },
    { pattern:/p-./},
    { pattern:/w-./},
  ],
  theme: {
    colors:{
      'black':'#201616',
      'white':'#F0F4EF',
      'pure-white':'#FFFFFF',
      'red':'#D22B2B',
      'yellow':'#FFEF00',
      'green':'#4CBB17',
      'blue':'#4E8098',
    },
    fontFamily:{
      'heading':['Exo', 'sans-serif'],
      'body':['Prompt', 'sans-serif'],
    },
  },
  plugins: [],
}