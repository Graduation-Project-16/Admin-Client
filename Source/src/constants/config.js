// export const serverdomain = "https://graserver.herokuapp.com/";
export const serverdomain = "http://localhost:5001/";
export const toThousandString = input => {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"
}

export const toLocalDateTime = input => {
    return input.toString().replace("T", " ").substring(0, input.length - 5);
}

export const toLocalDate = input => {
    return input.toString().substring(0, 10);
}

export const changePage = (fulldata, page) => {
    return fulldata.slice((page-1)*5, page*5);
}

export const search = (data, key) => {
    let results = [];
    data.forEach(element => {
        if (JSON.stringify(element).search(key) !== -1) {
            results.push(element)
        }
    });
    return results;
}
