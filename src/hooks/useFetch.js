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
            const res = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                credentials: 'include'
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const result = await res.json();
            
            if (!result.success) {
                throw new Error(result.message);
            }

            setData(result.data); // Set the data directly from result.data
            setError(null);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err.message);
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [url, token]);

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
