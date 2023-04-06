// isLoggedIn
export const isLoggedIn = () => {
    const data = localStorage.getItem("data");
    if(data) {
        return true;
    }
    else {
        return false;
    }
};

// doLogin => Set data to localStorage
export const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data));
    next(); // This next() is used to do any execution after login
}

// doLogout => Remove data from localStorage
export const doLogout = (next) => {
    localStorage.removeItem("data");
    next(); // This next() is used to do any execution after logout
};

// isLoggedOut
export const isLoggedOut = () => {
    const data = localStorage.getItem("data");
    if(data === null) {
        return true;
    }
    else {
        return false;
    }
}

// getCurrentUserDetails
export const getCurrentUserDetails = () => {
    if(isLoggedIn()) {
        return JSON.parse(localStorage.getItem("data"))?.userDto;
    }
    else {
        console.log('Logged Out!!');
        return undefined;
    }
};


// To get jwt token from local storage
export const getToken = () => {
    if(isLoggedIn()) {
        return JSON.parse(localStorage.getItem("data"))?.token;
    }
    else {
        return null;
    }
}