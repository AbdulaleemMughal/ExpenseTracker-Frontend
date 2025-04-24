import moment from 'moment';

export const dateFormatter = (date) => {
    const formattedDate = moment(date).format("DD/MM/YYYY");
    return formattedDate;
};