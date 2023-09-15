export const collections = {
	'skogstjern-mobelsett': 'Skogstjern Mobelsett',
	'havsglede-enhet': 'Havsglede Enhet',
	'sommardrom-kombinasjon': 'Sommardrom Kombinasjon',
	'vinterlyst-stue': 'Vinterlyst Stue',
	'solnedgang-salong': 'Solnedgang Salong',
	'snofall-sovesal': 'Snofall Sovesal',
	'nattlys-ensemble': 'Nattlys Ensemble',
	'ljungskog-sovesett': 'Ljungskog Sovesett',
	'fjellvind-hygge': 'Fjellvind Hygge',
} as const;

export const productTypes = {
	chairs: 'Chairs',
	lamps: 'Lamps',
	tables: 'Tables',
} as const;

type MenuProductType = {
	category: (typeof productTypes)[keyof typeof productTypes];
	query: keyof typeof productTypes;
	children?: {
		label: (typeof collections)[keyof typeof collections];
		query: keyof typeof collections;
	}[];
};

export const menu: MenuProductType[] = [
	{
		category: productTypes.chairs,
		query: 'chairs',
		children: [
			{
				label: collections['skogstjern-mobelsett'],
				query: 'skogstjern-mobelsett',
			},
			{
				label: collections['havsglede-enhet'],
				query: 'havsglede-enhet',
			},
			{
				label: collections['sommardrom-kombinasjon'],
				query: 'sommardrom-kombinasjon',
			},
		],
	},
	{
		category: productTypes.lamps,
		query: 'lamps',
		children: [
			{
				label: collections['vinterlyst-stue'],
				query: 'vinterlyst-stue',
			},
			{
				label: collections['solnedgang-salong'],
				query: 'solnedgang-salong',
			},
			{
				label: collections['snofall-sovesal'],
				query: 'snofall-sovesal',
			},
		],
	},
	{
		category: productTypes.tables,
		query: 'tables',
		children: [
			{
				label: collections['nattlys-ensemble'],
				query: 'nattlys-ensemble',
			},
			{
				label: collections['ljungskog-sovesett'],
				query: 'ljungskog-sovesett',
			},
			{
				label: collections['fjellvind-hygge'],
				query: 'fjellvind-hygge',
			},
		],
	},
];
