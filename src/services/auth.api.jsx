const baseurl = "http://localhost:8000";

export const register = async (data) => {
    try {
        const res = await fetch(`${baseurl}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await res.json();  // <- Declare first
        return { status: res.status, data: responseData };  // Use consistent naming

    } catch (err) {
        console.log("Error in register", err);
        return { status: 999, data: "Unexpected error" };
    }
};

export const verifyemail = async (data) => {
    try {
        const res = await fetch(`${baseurl}/api/auth/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await res.json();  // <- Declare first
        return { status: res.status, data: responseData };  // Use consistent naming

    } catch (err) {
        console.log("Error in register", err);
        return { status: 999, data: "Unexpected error" };
    }
};

export const login = async (data) => {
    try {
        const res = await fetch(`${baseurl}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await res.json();  // <- Declare first
        return { status: res.status, data: responseData };  // Use consistent naming

    } catch (err) {
        console.log("Error in register", err);
        return { status: 999, data: "Unexpected error" };
    }
};
