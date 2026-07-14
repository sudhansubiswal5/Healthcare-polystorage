import { bookBed } from "../api/hospitalApi";

function BedGrid({ beds }) {
  const handleBook = async (bedId) => {
    try {
      // 🔥 Dummy data (later replace with form input)
      const data = {
        bedId,
        patientName: "Test Patient",
        doctor: "Dr. Smith",
        date: new Date(),
      };

      await bookBed(data);

      alert("Bed booked successfully!");

      // Reload page (simple approach)
      window.location.reload();

    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {beds.map((bed) => (
        <div
          key={bed._id}
          className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-xl font-bold mb-2">
              Bed #{bed.bedNum}
            </h2>
            <p className="text-gray-600 capitalize">
              Type: {bed.type}
            </p>
          </div>

          {/* Status */}
          <div className="mt-4 flex flex-col gap-2">
            {bed.status === "occupied" ? (
              <span className="px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-full w-fit">
                Occupied
              </span>
            ) : (
              <>
                <span className="px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded-full w-fit">
                  Available
                </span>

                {/* 🔥 Book Button */}
                <button
                  onClick={() => handleBook(bed._id)}
                  className="mt-2 bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
                >
                  Book Now
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BedGrid;