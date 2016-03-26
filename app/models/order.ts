export interface Order {
	code: string;
	description: string;
	service: string;
	client: string;
	status: string;
	creation_date: Date;
	price: number;
} 