import ReactCountryFlag from "react-country-flag";
import countryList from "react-select-country-list";

const CountryFlag = ({ profile }) => {
  const country = countryList()
    .getData()
    .find((item) => item.label === profile?.country);

  if (!country) return null;

  return (
    <div className="flex items-center mt-2">
      <ReactCountryFlag
        countryCode={country.value}
        svg
        style={{
          width: 24,
          height: 24,
        }}
      />
      <span className="ml-2 text-gray-500">{profile?.country}</span>
    </div>
  );
};

export default CountryFlag;
