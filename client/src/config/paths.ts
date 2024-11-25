export const paths = {
	home: {
		path: "/",
		getHref: () => "/",
	},
	auth: {
		register: {
			path: "/sign-up",
			getHref: () => "/sign-up",
		},
		login: {
			path: "/sign-in",
			getHref: () => "/sign-in",
		},
	},
	app: {
		tickets: {
			path: "/tickets",
			getHref: () => "/tickets",
		},
		ticket: {
			path: "/tickets/:ticketId",
			getHref: (id: string) => `/tickets/${id}`,
		},
	},
} as const;
