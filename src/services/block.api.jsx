const baseurl = "http://localhost:8000";

export const blockContact = async ({ token, username }) => {
    try {
        const res = await fetch(`${baseurl}/api/block/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ username })
        });

        const data = await res.json();
        return { status: res.status, data };
    } catch (err) {
        console.log('Error occurred while adding to block list:', err);
        return { status: 999, data: 'Error' };
    }
};

export const removeBlock = async ({ token, contactId }) => {
    try {
        const res = await fetch(`${baseurl}/api/block/remove`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ contactId })
        });

        const data = await res.json();
        return { status: res.status, data };
    } catch (err) {
        console.error('Error removing blick:', err);
        return { status: 500, data: { mess: 'Network error while removing block' } };
    }
};