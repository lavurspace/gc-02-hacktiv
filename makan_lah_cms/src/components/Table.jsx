export function TableHead({ children }) {
	return (
		<thead className="table-dark">
			<tr>{children}</tr>
		</thead>
	);
}

export function TableBody({ children }) {
	return <tbody>{children}</tbody>;
}

export function TableHeader({ children, className = "" }) {
	return (
		<th scope="col" className={`py-3 ${className}`}>
			{children}
		</th>
	);
}

export function TableCell({ children, className = "" }) {
	return <td className={`align-middle ${className}`}>{children}</td>;
}

export function TableRow({ children, className = "" }) {
	return <tr className={`align-middle ${className}`}>{children}</tr>;
}

export default function Table({ children, className = "" }) {
	return (
		<div className="table-responsive">
			<table className={`table table-hover align-middle ${className}`}>
				{children}
			</table>
		</div>
	);
}
