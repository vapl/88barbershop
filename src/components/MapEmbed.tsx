interface Props {
  query: string;
  title?: string;
}

const MapEmbed: React.FC<Props> = ({ query, title }) => {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  return (
    <div className="w-full h-[400px] overflow-hidden">
      <iframe
        title={title || query}
        src={src}
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
