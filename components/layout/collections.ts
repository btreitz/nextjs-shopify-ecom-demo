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
				label: 'Chair Collection 1',
				query: 'chair-collection-1',
			},
			{
				label: 'Chair Collection 2',
				query: 'chair-collection-2',
			},
		],
	},
	{
		category: 'Lamps',
		query: 'lamps',
		children: [
			{
				label: 'Lamp Collection 1',
				query: 'lamp-collection-1',
			},
			{
				label: 'Lamp collection 2',
				query: 'lamp-collection-2',
			},
		],
	},
];

export default collections;
