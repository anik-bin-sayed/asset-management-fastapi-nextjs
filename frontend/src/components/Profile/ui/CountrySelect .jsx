"use client";

import { useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

const CountrySelect = ({
  value,
  onChange,
  label = "Country",
  placeholder = "Select your country",
}) => {
  const countries = useMemo(() => countryList().getData(), []);

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <Select
        options={countries}
        placeholder={placeholder}
        isSearchable
        value={countries.find((country) => country.label === value) || null}
        onChange={(selectedOption) => onChange(selectedOption?.label || "")}
        styles={{
          control: (base, state) => ({
            ...base,
            minHeight: 48,
            borderRadius: 10,
            borderColor: state.isFocused ? "#facc15" : "#d1d5db",
            boxShadow: "none",
            "&:hover": {
              borderColor: "#facc15",
            },
          }),

          option: (base, state) => ({
            ...base,
            cursor: "pointer",
            backgroundColor: state.isFocused ? "#fef9c3" : "#fff",
            color: "#111827",
          }),

          menu: (base) => ({
            ...base,
            zIndex: 9999,
          }),
        }}
      />
    </div>
  );
};

export default CountrySelect;
