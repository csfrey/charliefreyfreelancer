import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const Photography = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const photoQuery = useQuery({
    queryKey: ["photos"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `https://charliefrey-portfolio-photos.s3.us-east-2.amazonaws.com/?list-type=2`,
          { mode: "cors" }
        );
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");
        const contents = xmlDoc.getElementsByTagName("Contents");
        let imageURLs = [];

        for (let i = 0; i < contents.length; i++) {
          const key = contents[i].getElementsByTagName("Key")[0].textContent;
          if (key.endsWith("/")) continue;
          imageURLs.push(
            `https://charliefrey-portfolio-photos.s3.amazonaws.com/${key}`
          );
        }

        return imageURLs;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  });

  // Array of image URLs; default to an empty array while loading.
  const images = photoQuery.data || [];

  // Opens the modal by setting the selected index.
  const openModal = (index) => setSelectedImageIndex(index);
  // Closes the modal.
  const closeModal = () => setSelectedImageIndex(null);

  // Move to the next image, wrapping around at the end.
  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return (prevIndex + 1) % images.length;
    });
  };

  // Move to the previous image, wrapping around to the last image if needed.
  const previousImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return (prevIndex - 1 + images.length) % images.length;
    });
  };

  return (
    <div>
      <div className="font-boldonse text-3xl text-white text-center my-8">
        PHOTOGRAPHY
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 ">
        {!photoQuery.isLoading &&
          images.map((imgUrl, index) => (
            <img
              key={imgUrl}
              src={imgUrl}
              alt="Photo"
              className="cursor-pointer hover:brightness-75 transition-all"
              onClick={() => openModal(index)}
            />
          ))}
      </div>

      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={closeModal}
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
          }}
        >
          <div className="relative flex items-center">
            {/* Previous Button */}
            <button
              className="absolute left-4 text-white text-3xl"
              onClick={previousImage}
            >
              &#10094;
            </button>
            {/* Enlarged Image */}
            <img
              src={images[selectedImageIndex]}
              alt="Enlarged"
              className="max-h-screen max-w-full"
            />
            {/* Next Button */}
            <button
              className="absolute right-4 text-white text-3xl"
              onClick={nextImage}
            >
              &#10095;
            </button>
            {/* Close Button */}
            <button
              className="absolute top-0 right-0 m-2 text-white text-2xl font-bold"
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photography;
