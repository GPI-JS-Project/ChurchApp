// src/helpers/formatHelper.js
import dayjs from 'dayjs';

export function formatBirthdayToText(birthdate) {
    const today = dayjs();
    const parsedBirthday = dayjs(birthdate);

    const day = parsedBirthday.date();
    const month = parsedBirthday.month() + 1;
    const resetDate = dayjs(today.year() + '-' + month + '-' + day);
    const formattedText = resetDate.format("dddd, DD MMMM YYYY");

    return formattedText;
}