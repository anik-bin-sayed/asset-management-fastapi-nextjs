const UserTableLoader = () => {
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Header */}
        <thead className="bg-gray-50">
          <tr>
            {["User", "Email / Phone", "Role", "Actions"].map((item) => (
              <th
                key={item}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>

        {/* Skeleton Body */}
        <tbody className="divide-y divide-gray-200 bg-white">
          {Array.from({ length: 6 }).map((_, index) => (
            <tr key={index} className="animate-pulse">
              {/* User */}
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center">
                  {/* Avatar */}
                  <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200" />

                  <div className="ml-4 space-y-2">
                    {/* Name */}
                    <div className="h-4 w-28 rounded bg-gray-200" />

                    {/* Username */}
                    <div className="h-3 w-20 rounded bg-gray-200" />
                  </div>
                </div>
              </td>

              {/* Email / Phone */}
              <td className="whitespace-nowrap px-6 py-4">
                <div className="space-y-2">
                  <div className="h-4 w-40 rounded bg-gray-200" />
                  <div className="h-3 w-28 rounded bg-gray-200" />
                </div>
              </td>

              {/* Role */}
              <td className="whitespace-nowrap px-6 py-4">
                <div className="h-5 w-16 rounded-full bg-gray-200" />
              </td>

              {/* Actions */}
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-16 rounded-md bg-gray-200" />
                  <div className="h-8 w-24 rounded-md bg-gray-200" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTableLoader;
