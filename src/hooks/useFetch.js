import { useState, useEffect, useCallback, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useFetch = (url) => {
    const { token } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            console.log(`Fetching data from: ${url}`); // Log the URL being fetched
            const headers = {
                'Content-Type': 'application/json'
            };
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const res = await fetch(url, {
                headers,
                credentials: 'include'
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
            }
            const result = await res.json();
            console.log('Fetched data:', result); // Log the fetched data
            setData(result.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err.message);
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [url, fetchData]);

    return {
        data,
        error,
        loading,
        refetch: fetchData
    };
};

export default useFetch;
