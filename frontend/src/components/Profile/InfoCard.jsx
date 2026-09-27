const InfoCard = ({ icon, title, value }) => {
  const isUrl = (text) => {
    if (!text || text === "-") return false;

    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="rounded-xl border border-gray-100 p-5 transition">
      <div className="mb-3 text-xl text-black">{icon}</div>

      <p className="text-sm text-gray-500">{title}</p>

      <h4 className="mt-1 font-semibold text-gray-800 break-all">
        {isUrl(value) ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </h4>
    </div>
  );
};

export default InfoCard;
