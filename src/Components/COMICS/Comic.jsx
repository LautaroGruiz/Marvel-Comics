import "./Comic.scss";

const Comic = ({ data }) => {
  return (
    <div className="comics">
      {data.map((comic) => {
        const detailsUrl = comic.urls.find(
          (element) => element["type"] === "detail"
        ).url;
        return (
          <a
            key={comic.id}
            className="comicCard"
            style={{
              background: `url(${comic.thumbnail.path}.${comic.thumbnail.extension}) no-repeat center`,
              backgroundSize: "cover",
            }}
            href={detailsUrl}
            target="_blank"
            rel="noreferrer"
          >
            <div className="caption">{comic.title}</div>
            <div className="caption bottom">Ver detalle de comics</div>
          </a>
        );
      })}
    </div>
  );
};

export default Comic;
