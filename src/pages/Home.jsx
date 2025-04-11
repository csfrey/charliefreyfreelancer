import { Link } from "react-router-dom";

const PhotoLinkPortrait = ({ children, bg, to }) => {
  return (
    <Link to={to} className="relative flex justify-center cursor-pointer w-1/3">
      <img src={bg} className="w-full h-auto object-cover" />
      <div className="absolute w-full h-full transition opacity-35 hover:opacity-50 bg-black"></div>
      <div className="absolute top-1/2 transform -translate-y-1/2 text-white font-boldonse text-4xl">
        {children}
      </div>
    </Link>
  );
};

const PhotoLinkLandscape = ({ children, bg, to }) => {
  return (
    <Link
      to={to}
      className="relative flex justify-center cursor-pointer w-full"
    >
      <img src={bg} className="w-full h-auto object-cover" />
      <div className="absolute w-full h-full transition opacity-35 hover:opacity-50 bg-black"></div>
      <div className="absolute top-1/2 transform -translate-y-1/2 text-white font-boldonse text-4xl">
        {children}
      </div>
    </Link>
  );
};

const Home = () => {
  return (
    <>
      {/* <div className="font-boldonse text-white text-center mb-4">
        Hey there! I&apos;m a freelancer and artist based in Seattle, WA. Check
        out the various things I do:
      </div> */}
      <div className="hidden lg:block">
        <section className="flex">
          <PhotoLinkPortrait
            to="/photography"
            bg="/images/photography-portrait.jpg"
          >
            PHOTOGRAPHY
          </PhotoLinkPortrait>
          <PhotoLinkPortrait to="/music" bg="/images/music-portrait.jpg">
            MUSIC
          </PhotoLinkPortrait>
          <PhotoLinkPortrait to="/software" bg="/images/software-portrait.jpg">
            SOFTWARE
          </PhotoLinkPortrait>
        </section>
      </div>
      <div className="block lg:hidden">
        <section>
          <PhotoLinkLandscape
            to="/photography"
            bg="/images/photography-landscape.jpg"
          >
            PHOTOGRAPHY
          </PhotoLinkLandscape>
          <PhotoLinkLandscape to="/music" bg="/images/music-landscape.jpg">
            MUSIC
          </PhotoLinkLandscape>
          <PhotoLinkLandscape
            to="/software"
            bg="/images/software-landscape.jpg"
          >
            SOFTWARE
          </PhotoLinkLandscape>
        </section>
      </div>
    </>
  );
};

export default Home;
