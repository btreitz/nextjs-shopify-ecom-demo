'use client';

import { useState } from 'react';

type ProductDescriptionProps = {
	description: string;
};

export default function ProductDecscription({ description }: ProductDescriptionProps) {
	const [expanded, setExpanded] = useState(false);

	const toggleExpanded = () => {
		setExpanded(!expanded);
	};

	return (
		<div className=" p-4 text-sm leading-6">
			{description.length <= 200 || expanded ? (
				<span>{description}</span>
			) : (
				<span>{description.substring(0, 200)} ...</span>
			)}
			{description.length > 200 && (
				<button className=" font-light" onClick={toggleExpanded}>
					{expanded ? 'Read Less' : 'Read More'}
				</button>
			)}
		</div>
	);
}
