type Collection = {
	category: string;
	children?: {
		label: string;
		href: string;
	}[];
};

const collections: Collection[] = [
	{
		category: 'Chairs',
		children: [
			{
				label: 'Chair Collection 1',
				href: '#',
			},
			{
				label: 'Chair Collection 2',
				href: '#',
			},
		],
	},
	{
		category: 'Lamps',
		children: [
			{
				label: 'Lamp Collection 1',
				href: '#',
			},
			{
				label: 'Lamp Collection 2',
				href: '#',
			},
		],
	},
];

export default collections;
