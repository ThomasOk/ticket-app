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
} as const;
