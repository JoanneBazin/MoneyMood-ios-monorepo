import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { fr } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { MonthYearPickerProps } from "@/types";

export const MonthYearPicker = ({
  onChange,
  defaultInput = true,
}: MonthYearPickerProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (defaultInput) {
      onChange(selectedDate.getMonth() + 1, selectedDate.getFullYear());
    }
  }, []);

  const handleChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      onChange(date.getMonth() + 1, date.getFullYear());
    }
  };
  return (
    <>
      <label htmlFor="date-picker" className="sr-only">
        Sélectionner une date
      </label>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="MMMM yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
        locale={fr}
        className="picker-input"
        id="date-picker"
      />
    </>
  );
};
