import Section from "./Section";

const Footer = () => {
  return (
    <div>
      <div className="bg-[#f8f7f7] pb-28 mt-auto w-96px lg:block hidden lg:w-full z-0 font-rob bot-0">
        <Section />
        <div className="w-3/4 mx-auto justify-evenly flex  flex-row">
          <div className="flex flex-col gap-y-4 text-sm font-sans font-normal text-gray-400">
            <a href="/#">About BBMark</a>
            <a href="/#">Careers</a>
            <a href="/#">Blog</a>
            <a href="/#">Features</a>
          </div>
          <div className="flex flex-col gap-y-4 text-sm font-sans font-normal text-gray-400">
            <a href="/#">BBMark Help Center</a>
            <a href="/#">24/7 Support</a>
            <a href="/#">Report Abuse</a>
            <a href="/#">Contact</a>
          </div>
          <div className="flex flex-col gap-y-4 text-sm font-sans font-normal text-gray-400">
            <a href="/#">All Categories</a>
            <a href="/#">Resources</a>
            <a href="/#">Ready to Ship</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
