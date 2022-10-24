import axios from 'axios';

export const getUsers = () => {
    return new Promise((resolve, reject) => {
        const response = axios.get(
            'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );

        response
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};