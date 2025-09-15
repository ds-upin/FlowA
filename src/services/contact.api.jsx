const baseurl = "http://localhost:8000"


export const getContactList = async (token) => {
    try {
        const res = await fetch(`${baseurl}/api/contact`, {
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

export const addInContact = async ({token,username}) => {
    try{
        const res = await fetch(`${baseurl}/api/contact/add`,{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({username})
        })
        const data2 =await  res.json();
        return {status:res.status,data:data2};
    }catch(err){
        console.log(err);
    }
}

export const removeContact = async ({ token, contactId }) => {
    try {
        const res = await fetch(`${baseurl}/api/contact/remove`, {
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
        console.error('Error removing contact:', err);
        return { status: 500, data: { mess: 'Network error while removing contact' } };
    }
};
