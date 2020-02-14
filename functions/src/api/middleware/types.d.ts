declare namespace Express
{
	export interface Request
	{
		isAdmin: boolean;
		isStaff: boolean;
		body: any;
	}
}
