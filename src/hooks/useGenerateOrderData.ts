const useGenerateOrderData = () => {
  const generateOrderNumber = (): string => {
    const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const randomNumber = Math.floor(Math.random() * 100000);
    return `${randomLetter}${randomNumber.toString().padStart(5, '0')}`;
  };

  const getCurrentDate = (): string => {
    const date = new Date()
    const getYear = date.getFullYear()
    const getMonth = String(date.getMonth() + 1).padStart(2, '0');
    const getDay = String(date.getDate()).padStart(2, '0');

    return `${getYear}-${getMonth}-${getDay}`
  }

  return { generateOrderNumber, getCurrentDate };
};

export default useGenerateOrderData;
