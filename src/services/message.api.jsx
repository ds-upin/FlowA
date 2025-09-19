const baseurl = 'https://flowa-server.onrender.com'

export const getPendingList = async (token) => {
    try {
        const res = await fetch(`${baseurl}/api/pendingMessage`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data1 = await res.json();
        return { status: res.status, data: data1 };
    } catch (err) {
        console.log('Network Error', err);
        return { status: 500, data: { error: 'Network Error' } };
    }
}