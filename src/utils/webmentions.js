/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from "react";

export const loadWebMentionCounts = async (target) =>
  fetch(`https://webmention.io/api/count.json?target=${target}`)
    .then((res) => res.json())
    .then((res) => res.type);

export const loadWebMentions = async (target, page = 0) =>
  fetch(
    `https://webmention.io/api/mentions?page=${page}&per-page=20&sort-dir=up&sort-by=published&target=${target}`
  )
    .then((res) => res.json())
    .then((json) => (Array.isArray(json.links) ? json.links : []));

export default function WebMentions({ url }) {
  const fullUrl = `https://joshghent.com${url}`;
  const [type, setType] = useState({});
  const [page, setPage] = useState(0);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const twitterHref = `https://twitter.com/intent/tweet/?text=Great%20post%20by%20@joshghent%20${fullUrl}`;

  useEffect(() => {
    async function loadPage() {
      loadWebMentions(fullUrl, page).then((returnedLinks) => {
        setLoading(false);
        setLinks((links) => links.concat(returnedLinks));

        if (returnedLinks.length === 20) {
          setPage(page + 1);
        }
      });
    }

    loadPage();
  }, [url, page]);

  useEffect(() => {
    const fullUrl = `https://joshghent.com${url}`;
    loadWebMentionCounts(fullUrl).then((data) => setType(data));
  }, [url]);

  function renderMentions() {
    return links.slice(0).map((link) => {
      if (link.activity.type === "reply" || link.activity.type === "link") {
        console.log(link);
        let date = new Date(link.data.published ?? link.verified_date);
        date = new Intl.DateTimeFormat("en-GB", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(date);
        return (
          <li className="webmention--item" key={`webmention-${link.id}`}>
            <article>
              <div className="webmention--meta">
                <a
                  href={link.data.url}
                  className="webmention--author"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.data.author?.photo && (
                    <img
                      alt=""
                      className="webmention--image"
                      src={link.data.author?.photo}
                    />
                  )}{" "}
                  <strong>{link.data.author?.name || link.data.url}</strong>
                </a>
                <span className="webmention--date--divider">-</span>
                <time dateTime={date}>{date}</time>
              </div>
              <div
                className="webmention--content"
                dangerouslySetInnerHTML={{ __html: link.data.content }}
              />
            </article>
          </li>
        );
      }
      return [];
    });
  }

  function renderLikes() {
    if (loading) {
      return <div>Loading webmentions...</div>;
    }
    if (!loading && links.length === 0) {
      return "";
    }
    if (!loading) {
      return links.slice(0).map((link, index) => {
        if (link.activity.type === "like") {
          let date = new Date(link.data.published ?? link.verified_date);
          date = new Intl.DateTimeFormat("en-US").format(date);
          return (
            <div className="webmention--item" key={index}>
              <div className="webmention--meta">
                <a href={link.data.url}>
                  {link.data.author?.photo && (
                    <img
                      alt=""
                      className="webmention--image"
                      src={link.data.author?.photo}
                    />
                  )}{" "}
                </a>
              </div>
            </div>
          );
        }
        return "";
      });
    }
  }

  function renderContent() {
    if (loading) {
      return <div>Loading Webmentions...</div>;
    }

    console.log(links);
    if (
      !loading &&
      links.filter((l) => ["reply", "link"].includes(l.activity.type))
        .length === 0
    ) {
      return <div>No webmentions yet.</div>;
    }

    if (!loading) {
      return renderMentions();
    }
    return null;
  }

  return (
    <div>
      <div className="webmention--header">
        <h3>Webmentions</h3>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://indieweb.org/Webmention"
        >
          What&apos;s this?
        </a>
      </div>
      {/* <ul className="webmention--likes">{renderLikes()}</ul> */}
      <ul className="webmention--replies">{renderContent()}</ul>
    </div>
  );
}
