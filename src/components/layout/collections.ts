type Collection = {
	category: string;
	query: string;
	children?: {
		label: string;
		query: string;
	}[];
};

const collections: Collection[] = [
	{
		category: 'Chairs',
		query: 'chairs',
		children: [
			{
				label: 'Skogstjern Mobelsett',
				query: 'skogstjern-mobelsett',
			},
			{
				label: 'Havsglede Enhet',
				query: 'havsglede-enhet',
			},
			{
				label: 'Sommardrom Kombinasjon',
				query: 'sommardrom-kombinasjon',
			},
		],
	},
	{
		category: 'Lamps',
		query: 'lamps',
		children: [
			{
				label: 'Vinterlyst Stue',
				query: 'vinterlyst-stue',
			},
			{
				label: 'Solnedgang Salong',
				query: 'solnedgang-salong',
			},
			{
				label: 'Snofall Sovesal',
				query: 'snofall-sovesal',
			},
		],
	},
	{
		category: 'Tables',
		query: 'tables',
		children: [
			{
				label: 'Nattlys Ensemble',
				query: 'nattlys-ensemble',
			},
			{
				label: 'Ljungskog Sovesett',
				query: 'ljungskog-sovesett',
			},
			{
				label: 'Fjellvind Hygge',
				query: 'fjellvind-hygge',
			},
		],
	},
];

export default collections;
