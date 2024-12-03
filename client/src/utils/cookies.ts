import Cookies from "js-cookie";

export const getCookieByKey = (key: string): string | null => {
	const value = Cookies.get(key);
	if (!value) {
		return null;
	}
	return value;
};

export const setCookieByKey = (
	key: string,
	value: string,
	options?: Cookies.CookieAttributes
): void => {
	Cookies.set(key, value, options);
};

export const deleteCookieByKey = (key: string): void => {
	Cookies.remove(key);
};
