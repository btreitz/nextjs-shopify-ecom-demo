'use client';

import { useEffect, useRef } from 'react';

type DialogModalProps = {
	openModal: boolean;
	closeModal: () => void;
	children: React.ReactNode;
	props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDialogElement>, HTMLDialogElement>;
};

export default function DialogModal({ openModal, closeModal, children, props }: DialogModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (openModal) {
			dialogRef.current?.showModal();
			document.body.classList.add('overflow-hidden');
		} else {
			dialogRef.current?.close();
			document.body.classList.remove('overflow-hidden');
		}
	}, [openModal]);

	return (
		<dialog ref={dialogRef} onCancel={closeModal} {...props}>
			{children}
		</dialog>
	);
}
