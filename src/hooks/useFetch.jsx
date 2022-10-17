import axios from 'axios';
import useSWR from 'swr';

// const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fetcher = (...args) => axios(...args).then((data) => data.data);

const useFetch = (url) => {
	const { data, error, isValidating, mutate } = useSWR(url, fetcher);

	return {
		data: data,
		isLoading: !data && !error,
		error: error,
		isValidating: isValidating,
		revalidate: mutate,
	};
};

export default useFetch;
