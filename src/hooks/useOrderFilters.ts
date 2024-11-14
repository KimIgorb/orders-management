// hooks/useOrderFilters.ts
import { useState, useEffect } from 'react';
import { IOrders } from '../types';

const useOrderFilters = (data: IOrders[]) => {
  const [filteredData, setFilteredData] = useState<IOrders[]>(data);

  useEffect(() => {
    if (data.length > 0) {
      setFilteredData(data);
    }
  }, [data]);

  const handleFilterStatus = (selected: string) => {
    if (selected) {
      setFilteredData(data.filter(item => item.orderStatus === selected));
    }
  };

  const handleDateRangeFilter = (startDate: string, endDate: string) => {
    const filteredByDate = data.filter(item => {
      const orderDate = new Date(item.orderTime);
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });
    setFilteredData(filteredByDate);
  };

  const handleSearchByNameOrNumber = (type: string, val: string) => {
    let result = data;
    if (type === 'name') {
      result = data.filter(item => item.userName.includes(val));
    } else if (type === 'orderNumber') {
      result = data.filter(item => item.orderNumber.includes(val));
    }
    setFilteredData(result);
  };

  const resetFilter = () => {
    setFilteredData(data);
  };

  return {
    filteredData,
    handleFilterStatus,
    handleDateRangeFilter,
    handleSearchByNameOrNumber,
    resetFilter,
  };
};

export default useOrderFilters;
