const MapEmbed = () => {
  return (
    <div className="w-full h-[400px] overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2176.5328094188517!2d24.094375515074955!3d56.939672236777305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eed02f3198fa3d%3A0x5cb9734a5d5a8b46!2zQWttZcWGdSBpZWxhIDE2LCBaZW1nYWxlcyBwcmlla8WhcGlsc8STdGEsIFLEq2dhLCBMVi0xMDQ4!5e0!3m2!1sen!2slv!4v1761070867832!5m2!1sen!2slv"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapEmbed;
