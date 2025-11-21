export const getPartsTime = (time: number) => {
    const hours = Math.trunc(time / 60);
    const minutes = time - hours * 60;

    return [hours, minutes ? (minutes < 10 ? '0' + minutes : minutes) : '00'];
}

export const formatDate = (val: string) => {
    const date = new Date(val);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}